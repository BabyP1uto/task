import { processJSON } from '../jsonProcessor';

describe('JSON Processor', () => {
    it('should correctly add and sort superheroes', () => {
        const jsonPath = './src/test/superheroes.json';
        processJSON(jsonPath);
    });
});
