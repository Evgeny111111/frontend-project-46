import _ from 'lodash';

const stringifyValue = (value, levelOfDepth) => {
  if (_.isPlainObject(value)) {
    const indent = ' '.repeat(4 * (levelOfDepth + 1));
    const closingIndent = ' '.repeat(4 * levelOfDepth);
    const entries = Object.entries(value).map(([key, val]) => {
      const formattedValue = _.isPlainObject(val) ? stringifyValue(val, levelOfDepth + 1) : val;
      return `${indent}${key}: ${formattedValue}`;
    }).join('\n');
    return `{\n${entries}\n${closingIndent}}`;
  }
  return `${value}`;
};

function stylish(list) {
  function innerFunc(listOfDifference, levelOfDepth) {
    const countedSpaces = ' '.repeat(4 * levelOfDepth);
    const result = listOfDifference.map((element) => {
      const indentationWithoutTwoSpaces = countedSpaces.slice(0, -2);
      switch (element.type) {
        case 'nested':
          return `${countedSpaces}${element.key}: {\n${innerFunc(element.value, levelOfDepth + 1)}\n${countedSpaces}}`;
        case 'added':
          return `${indentationWithoutTwoSpaces}+ ${element.key}: ${stringifyValue(element.value, levelOfDepth)}`;
        case 'unchanged':
          return `${indentationWithoutTwoSpaces}  ${element.key}: ${stringifyValue(element.value, levelOfDepth)}`;
        case 'removed':
          return `${indentationWithoutTwoSpaces}- ${element.key}: ${stringifyValue(element.value, levelOfDepth)}`;
        case 'changed':
          return `${indentationWithoutTwoSpaces}- ${element.key}: ${stringifyValue(element.prevValue, levelOfDepth)}\n${indentationWithoutTwoSpaces}+ ${element.key}: ${stringifyValue(element.value, levelOfDepth)}`;
        default:
          throw new Error(`Element type ${element.type} doesn't exist`);
      }
    });
    return result.join('\n');
  }
  const result = innerFunc(list, 1);
  return `{\n${result}\n}`;
}

export default stylish;
