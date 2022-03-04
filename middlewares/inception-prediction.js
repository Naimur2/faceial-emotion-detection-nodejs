/* eslint-disable prettier/prettier */
const keras = require("../lib/keras");
const fs = require('fs');
const path = require('path');

const getResult = async (req, res, next) => {
    const { filename } = req.file;
    const classes = ["Angry", "Happy", "Neutral", "Sad", "Surprise"];
    try {
        const Image = await keras.preprocessImage.mobileNET(
            `output/${filename}`
        );
        let result = await keras.predict(Image, "inception/model.json");
        const output = await result.map((re) => {
            return { ...re, classname: classes[re.classname] };
        });
        console.log(output)
        req.prediction = output;
        next();
    } catch (err) {
        const inp=path.join(__dirname,`../public/input/${filename}`)
        const out=path.join(__dirname,`../public/output/${filename}`)
        await fs.unlink(inp, () => {
            console.log("deleted");
        });
        await fs.unlink(out, () => {
            console.log("deleted");
        });
        console.log(err);
        res.status(500).json({ error: "There was a server side error!" });
    }
};

module.exports = getResult;
