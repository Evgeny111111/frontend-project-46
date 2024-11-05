const fs = require('fs');
const path = require('path');
const genDiff = require('../src/index.js');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Compare two JSON files', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const expectedOutput = readFixture('expected_file_json.txt').trim();

  expect(genDiff(path1, path2)).toEqual(expectedOutput);
});
