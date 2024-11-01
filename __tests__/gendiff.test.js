import genDiff from '../src/genDiff.js'; // Убедитесь, что путь правильный

test('should compare two JSON files', () => {
  const filepath1 = '__fixtures__/file1.json';
  const filepath2 = '__fixtures__/file2.json';
  const expectedDiff = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }`;

  expect(genDiff(filepath1, filepath2)).toBe(expectedDiff);
});