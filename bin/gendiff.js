#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);

    const data1 = readFileSync(absolutePath1);
    const data2 = readFileSync(absolutePath2);

    // Здесь вы можете вызвать функцию для сравнения данных
    console.log('File 1:', data1);
    console.log('File 2:', data2);
  });

program.parse(process.argv);

function readFileSync(filepath) {
  try {
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(fileContent); // Парсинг JSON
  } catch (error) {
    console.error(`Error reading file ${filepath}: ${error.message}`);
    process.exit(1); // Завершение программы с ошибкой
  }
}



