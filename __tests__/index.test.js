import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs, { read } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const path1 = getFixturePath('file1.json');
console.log(path1);
const expectedFile = readFixture('expected_file_json.txt');
console.log(expectedFile);

test('gendiff test', () => {
	expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedFile);
});
