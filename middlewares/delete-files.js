const express = require("express");
const fs = require("fs");
const path = require("path");

const deleteFile = async (req, res, next) => {
    try {
        const { filename } = req.file;
        const input = path.join(__dirname,`../public/input/${filename}`)
        const output = path.join(__dirname,`../public/output/${filename}`)
        await fs.unlink(input, () => {
            console.log("deleted");
        });
        await fs.unlink(output, () => {
            console.log("deleted");
        });
        next();
    } catch (error) {
        console.log(error);
        throw new Error("SomeThing Went wrong");
    }
};
module.exports=deleteFile