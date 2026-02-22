const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// ================= APPLY JOB (Jobseeker Only) =================
router.post(
  "/apply/:jobId",
  authMiddleware,
  roleMiddleware("jobseeker"),
  async (req, res) => {
    try {
      const { jobId } = req.params;

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      const existingApplication = await Application.findOne({
        job: jobId,
        applicant: req.user.id
      });

      if (existingApplication) {
        return res.status(400).json({ message: "Already applied to this job" });
      }

      const application = new Application({
        job: jobId,
        applicant: req.user.id
      });

      await application.save();

      res.status(201).json({ message: "Job applied successfully" });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


// ================= GET ALL APPLICATIONS FOR A JOB (Recruiter Only) =================
router.get("/job/:jobId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email role");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= GET MY APPLICATIONS (Jobseeker Only) =================
router.get("/my", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Access denied" });
    }

    const applications = await Application.find({
      applicant: req.user.id
    }).populate("job");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
