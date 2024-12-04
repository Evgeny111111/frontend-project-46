import _ from 'lodash';

function stringifyValue(value) {
  if (value === null) {
    return 'null';
  }
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
        return `Property '${fullPath}' was added with value: ${stringifyValue(element.value)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${stringifyValue(element.prevValue)} to ${stringifyValue(element.value)}`;
      case 'unchanged':
        return null; // Используем null, чтобы исключить элемент позже
      default:
        throw new Error(`Element type '${element.type}' doesn't exist`);
    }
  });

  return result.filter((line) => line !== null).join('\n'); // Убираем null-элементы
}

export default plain;
