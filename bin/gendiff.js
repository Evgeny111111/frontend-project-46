#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';
import { parseFile } from '../src/readFile.js';
const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);

    console.log('File 1 data:', data1);
    console.log('File 2 data:', data2);
    console.log(`Output format: ${options.format}`);
  })
  .parse(process.argv);
