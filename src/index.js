import path from 'path';
import process from 'node:process';
import format from './formatters/index.js';
import genDiff from './genDiff.js';
import parse from './parsers.js';

function parsePaths(filepath1, filepath2, formatter = 'stylish') {
  const pathResolved1 = path.resolve(process.cwd(), String(filepath1));
  const fileContent1 = parse(pathResolved1);
  const pathResolved2 = path.resolve(process.cwd(), String(filepath2));
  const fileContent2 = parse(pathResolved2);
  const difference = genDiff(fileContent1, fileContent2);
  const result = format(difference, formatter);
  return result;
}

export default parsePaths;
