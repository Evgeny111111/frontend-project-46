#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js'; // Импорт функции genDiff

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2); // Вызов функции сравнения
    console.log(diff); // Печать результата
  });

program.parse(process.argv);
