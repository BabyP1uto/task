import fs from 'fs';
import path from 'path';

export function processCSV(filePath: string): void {
    const data = fs.readFileSync(path.resolve(filePath), 'utf-8');
    const rows = data.split('\n').slice(1); // пропускаем заголовок

    let totalScore = 0;
    let count = 0;

    for (const row of rows) {
        const values = row.split(',').map(value => value.trim());
        const scores = values.slice(3, 7).map(score => parseFloat(score)); // диапазон в зависимости от ваших данных

        // все оценки являются числами
        if (scores.every(score => !isNaN(score))) {
            totalScore += scores.reduce((a, b) => a + b, 0);
            count += scores.length;
        } else {
            console.warn(`Некорректные данные в строке: ${row}`);
        }
    }

    const average = count > 0 ? totalScore / count : 0;
    console.log(`Средний балл: ${average}`);
}
