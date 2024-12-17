import * as fs from 'node:fs';
import * as path from 'node:path';
import process from 'process';
import getFileInfo from './parsers.js';
import gen from './genDiff.js';
import chooseFormat from './formatters/index.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getFilePath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const getDataFromFilepath1 = readFile(filepath1);
  const getDataFromFilepath2 = readFile(filepath2);
  const getObjectFromFile1 = getFileInfo(getDataFromFilepath1, getFormat(filepath1));
  const getObjectFromFile2 = getFileInfo(getDataFromFilepath2, getFormat(filepath2));
  const diff = gen(getObjectFromFile1, getObjectFromFile2);
  return chooseFormat(diff, format);
};

export default genDiff;
