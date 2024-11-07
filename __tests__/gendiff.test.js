import genDiff from '../src/index.js';

test('Compare two JSON files', () => {
  const filepath1 = '__fixtures__/file1.json';
  const filepath2 = '__fixtures__/file2.json';
  const expectedOutput = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`.trim();
  expect(genDiff(filepath1, filepath2)).toEqual(expectedOutput);
});
test('Compare two YAML files', () => {
  const filepath1 = '__fixtures__/file1.yml';
  const filepath2 = '__fixtures__/file2.yml';
  const expectedOutput = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`.trim();
  expect(genDiff(filepath1, filepath2)).toEqual(expectedOutput);
});
