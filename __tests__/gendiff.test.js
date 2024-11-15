import { expect, test } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import parsePaths from '../src/index.js';

// Настройка путей для работы с файлами в __fixtures__
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test.each([
  {
    file1: 'file1.json',
    file2: 'file2.json',
    format: 'stylish',
    expected: 'resultStylish.txt',
  },
  {
    file1: 'file1.yml',
    file2: 'file2.yml',
    format: 'stylish',
    expected: 'resultStylish.txt',
  },
  {
    file1: 'file1.json',
    file2: 'file2.json',
    format: 'plain',
    expected: 'resultPlain.txt',
  },
  {
    file1: 'file1.yml',
    file2: 'file2.yml',
    format: 'plain',
    expected: 'resultPlain.txt',
  },
  {
    file1: 'file1.json',
    file2: 'file2.json',
    format: 'json',
    expected: 'resultJson.txt',
  },
  {
    file1: 'file1.yml',
    file2: 'file2.yml',
    format: 'json',
    expected: 'resultJson.txt',
  },
])('compare %s and %s with format %s', ({
  file1, file2, format, expected,
}) => {
  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);
  const expectedResult = readFixture(expected);

  expect(parsePaths(filePath1, filePath2, format)).toEqual(expectedResult);
});
