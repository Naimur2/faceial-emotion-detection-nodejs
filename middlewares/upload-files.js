/* eslint-disable prettier/prettier */
const multer = require("multer");
const path = require("path");

const UPLOADS_FOLDER = path.join(__dirname, "../public/input/");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = `${file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-")}-${Date.now()}`;
        cb(null, fileName + fileExt);
    },
});

// prepare final multer upload object
const upload = multer({
    storage,
    limits: {
        fileSize: 1000000000000000000,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(new Error("Only .jpg .jpeg .png or gif file is allowed."));
        }
    },
});

module.exports = upload;
