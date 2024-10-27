import fs from 'fs';
import path from 'path';

interface Superhero {
    name: string;
    age: number;
    secretIdentity: string;
    powers: string[];
}

interface Squad {
    squadName: string;
    homeTown: string;
    formed: number;
    secretBase: string;
    active: boolean;
    members: Superhero[];
}

export function processJSON(filePath: string): void {
    const data = JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8')) as Squad;

    // добавляем новых супергероев
    data.members.push(
        { name: 'Invisible Man', age: 32, secretIdentity: 'John Smith', powers: ['Invisibility'] },
        { name: 'Storm Bringer', age: 28, secretIdentity: 'Sam Haze', powers: ['Storm control'] }
    );

    // сортируем по возрасту
    data.members.sort((a, b) => a.age - b.age);

    // проверка возраста
    const hasHeroOver30 = data.members.some(member => member.age > 30);
    console.log(`Есть ли супергерои старше 30 лет? ${hasHeroOver30 ? 'Да' : 'Нет'}`);

    fs.writeFileSync(path.resolve('./src/test/superhero_new.json'), JSON.stringify(data, null, 2));
}
