const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "hirehub/resumes",
    resource_type: "raw",
    format: "pdf",
    public_id: Date.now() + "-" + file.originalname.replace(".pdf", ""),
  }),
});

module.exports = multer({ storage });