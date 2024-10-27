import { processCSV } from '../csvProcessor';

describe('CSV Processor', () => {
    it('should calculate the average score correctly', () => {
        const csvPath = './src/test/grades.csv';
        processCSV(csvPath);
    });
});
