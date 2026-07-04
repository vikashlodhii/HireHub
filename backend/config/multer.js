const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "hirehub/resumes",
    resource_type: "raw",
  }),
});

module.exports = multer({ storage });