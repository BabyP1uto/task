"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCSV = processCSV;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function processCSV(filePath) {
    const data = fs_1.default.readFileSync(path_1.default.resolve(filePath), 'utf-8');
    const rows = data.split('\n').slice(1); // Пропускаем заголовок
    let totalScore = 0;
    let count = 0;
    rows.forEach(row => {
        const columns = row.split(',');
        const scores = columns.slice(3, 7).map(Number);
        const averageScore = scores.reduce((acc, score) => acc + score, 0) / scores.length;
        totalScore += averageScore;
        count++;
    });
    const overallAverage = totalScore / count;
    console.log(`Средний балл: ${overallAverage.toFixed(2)}`);
}
