import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

function parse(filePath) {
  const format = path.extname(filePath);
  switch (format) {
    case '.json':
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    case '.yml':
      return yaml.load(fs.readFileSync(filePath, 'utf8'));
    default:
      throw new Error(`Element format ${format} doesn't exist`);
  }
}

export default parse;
