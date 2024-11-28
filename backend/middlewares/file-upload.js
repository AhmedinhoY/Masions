const multer = require("multer");
const uuid = require("uuid").v1;
const path = require("path");
const fs = require("fs");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../uploads/images");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Create the folder if it doesn't exist
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext); // cb(error , filename )
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
