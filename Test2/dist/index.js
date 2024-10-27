"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvProcessor_1 = require("./csvProcessor");
const jsonProcessor_1 = require("./jsonProcessor");
const csvFilePath = './src/test/grades.csv';
const jsonFilePath = './src/test/superheroes.json';
(0, csvProcessor_1.processCSV)(csvFilePath);
(0, jsonProcessor_1.processJSON)(jsonFilePath);
