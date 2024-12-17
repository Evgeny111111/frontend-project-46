import _ from 'lodash';

const stringifyValue = (value) => {
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
};

function plain(difference, pathDepth = '') {
  return difference
    .map((element) => {
      const fullPath = pathDepth ? `${pathDepth}.${element.key}` : element.key;

      switch (element.type) {
        case 'nested':
          return plain(element.children, fullPath); // Используем `children` вместо `value`
        case 'added':
          return `Property '${fullPath}' was added with value: ${stringifyValue(element.value)}`;
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${stringifyValue(element.value1)} to ${stringifyValue(element.value2)}`;
        case 'unchanged':
          return '';
        default:
          throw new Error(`Element type '${element.type}' doesn't exist`);
      }
    })
    .filter(Boolean) // Убираем пустые строки
    .join('\n');
}

export default plain;
