import { processCSV } from './csvProcessor';
import { processJSON } from './jsonProcessor';

const csvFilePath = './src/test/grades.csv';
const jsonFilePath = './src/test/superheroes.json';

processCSV(csvFilePath);
processJSON(jsonFilePath);
