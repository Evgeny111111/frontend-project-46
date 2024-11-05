import _ from 'lodash';
import getData from './parsers.js';

function getDifferentObject(obj1, obj2) {
  const allKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)))
    .map((key) => {
      const oldValue = obj1[key];
      const newValue = obj2[key];
      if (!_.has(obj2, key)) {
        return {
          action: 'deleted',
          key,
          oldValue,
        };
      }
      if (!_.has(obj1, key)) {
        return {
          action: 'added',
          key,
          newValue,
        };
      }
      if (oldValue !== newValue) {
        return {
          action: 'changed',
          key,
          oldValue,
          newValue,
        };
      }
      return {
        action: 'unchanged',
        key,
        oldValue,
      };
    })
    .map((item) => {
      const result = [];
      if (item.action === 'deleted') {
        result.push(`  - ${item.key}: ${item.oldValue}\n`);
      }
      if (item.action === 'unchanged') {
        result.push(`    ${item.key}: ${item.oldValue}\n`);
      }
      if (item.action === 'changed') {
        result.push(`  - ${item.key}: ${item.oldValue}\n`);
        result.push(`  + ${item.key}: ${item.newValue}\n`);
      }
      if (item.action === 'added') {
        result.push(`  + ${item.key}: ${item.newValue}`);
      }
      return result;
    });
  return `{\n${allKeys.flat().join('')}\n}`;
}

function genDiff(filepath1, filepath2) {
  const dataFile1 = getData(filepath1);
  const dataFile2 = getData(filepath2);
  const result = getDifferentObject(dataFile1, dataFile2);
  return result;
}

export default genDiff;