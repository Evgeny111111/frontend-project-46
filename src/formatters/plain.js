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
        return plain(element.value, fullPath);  // Рекурсия для вложенных объектов
      case 'added':
        return `Property '${fullPath}' was added with value: ${isObject(element.value)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${isObject(element.prevValue)} to ${isObject(element.value)}`;
      case 'unchanged':
        return null;  // Используем null для неизмененных элементов
      default:
        throw new Error(`Element type ${element.type} doesn't exist`);
    }
  });

  // Отфильтровать null значения и соединить результат
  return result.filter(line => line !== null).join('\n');
}

export default plain;
