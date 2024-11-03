import fs from 'fs';
import path from 'path';

export const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

export const parseFile = (filepath) => {
  const data = readFile(filepath);

  if (!data) {
    throw new Error(`File is empty or cannot be read: ${filepath}`);
  }

  const extname = path.extname(filepath);

  if (extname === '.json') {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Failed to parse JSON in file: ${filepath}. Error: ${error.message}`);
    }
  }
  
  throw new Error(`Unsupported file format: ${extname}`);
};

