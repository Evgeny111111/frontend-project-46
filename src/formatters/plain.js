import _ from 'lodash';

function isObject(value) {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
}

function plain(difference, pathDepth = '') {
  const result = difference.map((element) => {
    const fullPath = pathDepth ? `${pathDepth}.${element.key}` : element.key;
    switch (element.type) {
      case 'nested':
        return plain(element.value, fullPath);
      case 'added':
        return `Property '${fullPath}' was added with value: ${isObject(element.value)}\n`;
      case 'removed':
        return `Property '${fullPath}' was removed\n`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${isObject(element.prevValue)} to ${isObject(element.value)}\n`;
      case 'unchanged':
        return '';
      default:
        throw new Error(`Element type ${element.type} doesn't exist`);
    }
  });
  return result.join('');
}

export default plain;
