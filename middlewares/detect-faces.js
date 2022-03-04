const path = require("path");
const cv = require("opencv4nodejs");


const detectFaces = async (req, res, next) => {
    const inputPath = path.join(
        __dirname,
        `../public/input/${req.file.filename}`
    );
    const outputPath = path.join(
        __dirname,
        `../public/output/${req.file.filename}`
    );
    const classifierPath = path.join(
        __dirname,
        "../classifiers/haarcascade_frontalface_alt2.xml"
    );

    try {
        const classifier = await new cv.CascadeClassifier(classifierPath);

        const image = await cv.imread(inputPath);
        const bgrGray = await image.bgrToGray();
        const { objects } = await classifier.detectMultiScale(bgrGray);

        const region = await image.getRegion(
            new cv.Rect(
                objects[0].x,
                objects[0].y,
                objects[0].width,
                objects[0].height
            )
        );

        if (!objects.length) {
            throw new Error("No faces detected!");
        }
        const reshapedImg = region.resizeToMax(224);
        await cv.imwrite(outputPath, reshapedImg);
        next();
    } catch (err) {
      
        // await fs.unlink(inputPath, () => {
        //     console.log("deleted");
        // });
        throw new Error("No faces detected!");
    }
};

module.exports = detectFaces;
