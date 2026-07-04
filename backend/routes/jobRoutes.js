const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("recruiter"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        company,
        location,
        salary,
        jobType,
        experience,
        skills,
        vacancies,
      } = req.body;

      const job = new Job({
        title,
        description,
        company,
        location,
        salary,
        jobType,
        experience,
        vacancies,
        skills: skills ? skills.split(",").map((item) => item.trim()) : [],
        postedBy: req.user.id,
      });

      await job.save();

      res.status(201).json({ message: "Job posted successfully", job });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.get("/", async (req, res) => {
  try {
    const { search, location, jobType } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } },
      ];
    }

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    const jobs = await Job.find(query).populate("postedBy", "name email");

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
  },
);
router.get(
  "/recruiter/stats",
  authMiddleware,
  roleMiddleware("recruiter"),
  async (req, res) => {
    try {
      const recruiterId = req.user.id;

      const totalJobs = await Job.countDocuments({
        postedBy: recruiterId,
      });

      const jobs = await Job.find({ postedBy: recruiterId });
      const jobIds = jobs.map((job) => job._id);

      const Application = require("../models/Application");

      const totalApplications = await Application.countDocuments({
        job: { $in: jobIds },
      });

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
  },
);
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
  },
);

router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  async (req, res) => {
    try {
      const updatedJob = await Job.findOneAndUpdate(
        { _id: req.params.id, postedBy: req.user.id },
        req.body,
        { new: true },
      );

      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json(updatedJob);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

router.get("/admin/jobs", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const jobs = await Job.find().populate("postedBy", "name email");

    res.json(jobs);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.delete("/admin/job/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
