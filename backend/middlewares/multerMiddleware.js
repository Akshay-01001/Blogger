import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder =
      file.fieldname === "thumbnail"
        ? "./uploads/thumbnails"
        : "./uploads/profilepics";
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, name) {
      if (err) return cb(err);
      const fn = name.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});


const uploadProfilePic = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("profile_pic");


const uploadThumbnail = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("thumbnail");

export { uploadProfilePic, uploadThumbnail };
