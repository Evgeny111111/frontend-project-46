import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

test('genDiff compares two JSON files correctly', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = fs.readFileSync(getFixturePath('expected_file_json.txt'), 'utf-8').trim();

  const result = genDiff(filepath1, filepath2).trim();

  console.log('Expected:', expected);
  console.log('Received:', result);

  expect(result).toBe(expected); // Убедитесь, что формат и отступы совпадают
});
