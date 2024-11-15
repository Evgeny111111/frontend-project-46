import _ from 'lodash';

function isObject(value) {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (Array.isArray(value)) {
    return '[array value]';
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
        return `Property '${fullPath}' was added with value: ${isObject(element.value)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${isObject(element.prevValue)} to ${isObject(element.value)}`;
      case 'unchanged':
        return '';
      default:
        throw new Error(`Element type ${element.type} doesn't exist`);
    }
  });

  return result.filter((line) => line !== '').join('\n');
}

export default plain;
