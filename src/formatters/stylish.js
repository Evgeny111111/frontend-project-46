import _ from 'lodash';

function stringifyValue(value, levelOfDepth) {
  if (_.isPlainObject(value)) {
    const indent = ' '.repeat(4 * (levelOfDepth + 1));
    const closingIndent = ' '.repeat(4 * levelOfDepth);
    const entries = Object.entries(value).map(([key, val]) => {
      const formattedValue = _.isPlainObject(val)
        ? stringifyValue(val, levelOfDepth + 1)
        : val;
      return `${indent}${key}: ${formattedValue}`;
    }).join('\n');
    return `{\n${entries}\n${closingIndent}}`;
  }
  return `${value}`;
}

function stylish(list) {
  function formatDiff(diff, depth) {
    const indent = ' '.repeat(4 * depth);
    const shortIndent = indent.slice(0, -2);

    const result = diff.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${indent}${node.key}: {\n${formatDiff(node.children, depth + 1)}\n${indent}}`;
        case 'added':
          return `${shortIndent}+ ${node.key}: ${stringifyValue(node.value, depth)}`;
        case 'removed':
          return `${shortIndent}- ${node.key}: ${stringifyValue(node.value, depth)}`;
        case 'unchanged':
          return `${shortIndent}  ${node.key}: ${stringifyValue(node.value, depth)}`;
        case 'changed':
          return [
            `${shortIndent}- ${node.key}: ${stringifyValue(node.value1, depth)}`,
            `${shortIndent}+ ${node.key}: ${stringifyValue(node.value2, depth)}`,
          ].join('\n');
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    });

    return result.join('\n');
  }

  return `{\n${formatDiff(list, 1)}\n}`;
}

export default stylish;
