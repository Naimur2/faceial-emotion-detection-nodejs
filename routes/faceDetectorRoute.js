const express = require("express");
const router = express.Router();
const uploads = require("../middlewares/upload-files");
const detectFaces = require("../middlewares/detect-faces");
const emotionDetection = require("../middlewares/inception-prediction");
const deleteFiles = require("../middlewares/delete-files");

router.get("/", (req, res) => {
    res.status("200").send({ message: "success" });
});

router.post(
    "/",
    uploads.single("data"),
    detectFaces,
    emotionDetection,
    deleteFiles,
    (req, res) => {
        res.status("200").send({ message: "success",result:req.prediction });
    }
);

module.exports = router;
