const recepieModule = require('./recepieModule');
const express = require('express');
const app = express();

let extractorResult = ['type', '_id', 'name', 'tags', 'body', 'date'];

function extract(object) {
    extractorResult[0] = object.type;
    extractorResult[1] = object._id;
    extractorResult[2] = object.name;
    extractorResult[3] = object.tags;
    extractorResult[4] = object.body;
    extractorResult[5] = object.date;

    return extractorResult;
};

module.exports.extract = extract;
module.exports.extractorResult = extractorResult;