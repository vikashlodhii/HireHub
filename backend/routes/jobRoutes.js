const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ================= CREATE JOB (Recruiter Only) =================
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("recruiter"),
  async (req, res) => {
    try {
      const { title, description, company, location } = req.body;

      const job = new Job({
        title,
        description,
        company,
        location,
        postedBy: req.user.id,
      });

      await job.save();

      res.status(201).json({ message: "Job posted successfully", job });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// ================= GET ALL JOBS =================
// ================= GET ALL JOBS (With Search) =================
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };
    }

    const jobs = await Job.find(query).populate("postedBy", "name email");

    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ================= GET MY JOBS (Recruiter Only) =================
router.get(
  "/my-jobs",
  authMiddleware,
  roleMiddleware("recruiter"),
  async (req, res) => {
    try {
      const jobs = await Job.find({ postedBy: req.user.id });

      res.status(200).json(jobs);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
// ================= RECRUITER STATS =================
router.get(
  "/recruiter/stats",
  authMiddleware,
  roleMiddleware("recruiter"),
  async (req, res) => {
    try {
      const recruiterId = req.user.id;

      // Total jobs posted by recruiter
      const totalJobs = await Job.countDocuments({
        postedBy: recruiterId,
      });

      // Get job IDs of recruiter
      const jobs = await Job.find({ postedBy: recruiterId });
      const jobIds = jobs.map(job => job._id);

      // Total applications for those jobs
      const Application = require("../models/Application");

      const totalApplications = await Application.countDocuments({
        job: { $in: jobIds },
      });

      // Unique applicants count
      const uniqueApplicants = await Application.distinct("applicant", {
        job: { $in: jobIds },
      });

      res.json({
        totalJobs,
        totalApplications,
        totalApplicants: uniqueApplicants.length,
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
// ================= DELETE JOB =================
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  async (req, res) => {
    try {
      const job = await Job.findOneAndDelete({
        _id: req.params.id,
        postedBy: req.user.id,
      });

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json({ message: "Job deleted successfully" });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// ================= UPDATE JOB =================
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  async (req, res) => {
    try {
      const updatedJob = await Job.findOneAndUpdate(
        { _id: req.params.id, postedBy: req.user.id },
        req.body,
        { new: true }
      );

      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json(updatedJob);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);



module.exports = router;
