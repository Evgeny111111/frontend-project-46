#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepat1>')
  .argument('<filepath2>')
  // .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
    console.log();
  });

program.parse();