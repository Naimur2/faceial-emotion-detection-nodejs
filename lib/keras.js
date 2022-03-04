/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');
const tfn = require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const lib = require('./preProcessImage');


const keras = lib;

keras.loadModel = async (modelDir) => {
    let kerasModel = '';
    const dir = path.join(__dirname, `/../public/models/${modelDir}`);
    const handler = tfn.io.fileSystem(dir);
    kerasModel = await tf.loadLayersModel(handler);
    return kerasModel;
};

keras.predict = async (imageFile, modelDir) => {
    let result = [];
    const model = await keras.loadModel(modelDir);
    const pred = await model.predict(imageFile).data();

    result = await Array.from(pred)
        .map((p, i) => ({ probablity: p, classname: i}))
        .sort((a, b) => b.probablity - a.probablity)
        .slice(0, 5);
    return result;
};

module.exports = keras;
