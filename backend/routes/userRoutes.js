const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Application = require("../models/Application");

const User = require("../models/User");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/save-job/:jobId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.savedJobs.includes(req.params.jobId)) {
      user.savedJobs.push(req.params.jobId);
      await user.save();
    }

    res.json({
      message: "Job Saved Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/saved-jobs", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedJobs");

    res.json(user.savedJobs);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.delete(
  "/unsave-job/:jobId",
  authMiddleware,
  async (req, res) => {
    try {

      const user = await User.findById(req.user.id);

      user.savedJobs = user.savedJobs.filter(
        (job) => job.toString() !== req.params.jobId
      );

      await user.save();

      res.json({
        message: "Job Removed Successfully",
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

router.post(
  "/upload-resume",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a resume",
        });
      }

      const user = await User.findById(req.user.id);

      user.resume = `/uploads/${req.file.filename}`;

      await user.save();

      res.json({
        message: "Resume Uploaded Successfully",
        resume: user.resume,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  },
);

router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      skills,
      education,
      experience,
      companyName,
      companyDescription,
      location,
      website,
    } = req.body;

    const user = await User.findById(req.user.id);

    user.name = name || user.name;
    user.skills = skills || user.skills;
    user.education = education || user.education;
    user.experience = experience || user.experience;

    user.companyName = companyName || user.companyName;
    user.companyDescription = companyDescription || user.companyDescription;
    user.location = location || user.location;
    user.website = website || user.website;

    await user.save();

    res.json({
      message: "Profile Updated Successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
router.get("/admin/stats", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const totalUsers = await User.countDocuments();

    const totalRecruiters = await User.countDocuments({
      role: "recruiter",
    });

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    res.json({
      totalUsers,
      totalRecruiters,
      totalJobs,
      totalApplications,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/admin/users", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.delete("/admin/user/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({
        message: "You can't delete yourself",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
module.exports = router;
