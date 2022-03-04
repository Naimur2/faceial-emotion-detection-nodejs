/* eslint-disable prettier/prettier */
const fs = require("fs");
const path = require("path");

const tfn = require("@tensorflow/tfjs-node");

const lib = {};
lib.preprocessImage = {};

lib.preprocessImage.VGG16 = (pathname) => {
    const pName = path.join(__dirname, `../public/${pathname}`);
    const meanImagenet = tfn.tensor1d([123.68, 116.779, 103.939]);
    const imageBuffer = fs.readFileSync(pName);
    const tensor = tfn.node.decodeImage(imageBuffer);
    return tensor
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .sub(meanImagenet)
        .reverse(2)
        .expandDims();
};

lib.preprocessImage.mobileNET = (pathname) => {
    const pName = path.join(__dirname, `../public/${pathname}`);
    const imageBuffer = fs.readFileSync(pName);
    const offset = tfn.scalar(127.5);
    const tensor = tfn.node.decodeImage(imageBuffer);
    return tensor
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .sub(offset)
        .div(offset)
        .expandDims();
};

module.exports = lib;
