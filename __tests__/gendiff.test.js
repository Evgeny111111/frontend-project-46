import path from 'path';
import genDiff from '../src/genDiff.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

test('genDiff compares two JSON files correctly', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  
  const expected = `
    {
      - follow: false
        host: hexlet.io
      - proxy: 123.234.53.22
      - timeout: 50
      + timeout: 20
      + verbose: true
    }
  `.trim();

  const result = genDiff(filepath1, filepath2);
  
  // Логируем ожидаемое и полученное значения
  console.log('Expected:', expected);
  console.log('Received:', result);
  
  expect(result).toBe(expected);
});
