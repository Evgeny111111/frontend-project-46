#!/usr/bin/env node

import { Command } from 'commander';
import parsePaths from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <format>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    console.log(parsePaths(filepath1, filepath2, format));
  });

program.parse(process.argv);
