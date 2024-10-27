"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processJSON = processJSON;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function processJSON(filePath) {
    const data = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(filePath), 'utf-8'));
    // Добавляем новых супергероев
    data.members.push({ name: 'Invisible Man', age: 32, secretIdentity: 'John Smith', powers: ['Invisibility'] }, { name: 'Storm Bringer', age: 28, secretIdentity: 'Sam Haze', powers: ['Storm control'] });
    // Сортируем супергероев по возрасту
    data.members.sort((a, b) => a.age - b.age);
    // Проверка возраста
    const areOlderThan30 = data.members.every(member => member.age > 30);
    console.log(`Супергерои старше 30 лет? ${areOlderThan30 ? 'Да' : 'Нет'}`);
    fs_1.default.writeFileSync(path_1.default.resolve('./src/test/superhero_new.json'), JSON.stringify(data, null, 2));
}
