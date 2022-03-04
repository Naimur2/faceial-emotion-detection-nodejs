const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const faceDetectorRoute = require('./routes/faceDetectorRoute');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
dotenv.config();

app.use('/face',faceDetectorRoute)

const port = process.env.PORT || 5000;

const errorHandler = (err, req, res, next) => {
    if (req.headerSent) {
        return next(err);
    }
    return res.status(500).json({ error: err });
};







app.listen(port, () => {
    console.log(`App started at port:${port}`);
});
