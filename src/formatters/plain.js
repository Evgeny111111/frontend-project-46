import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const caseAdded = (propertyPath, value) => `Property '${propertyPath}' was added with value: ${stringify(value)}`;
const caseRemoved = (propertyPath) => `Property '${propertyPath}' was removed`;
const caseChanged = (propertyPath, oldValue, newValue) => `Property '${propertyPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;

const plain = (nodes, path = []) => nodes
  .filter((node) => node.type !== 'unchanged')
  .map((node) => {
    const {
      type, key, value, value1, value2, children,
    } = node;

    const propertyPath = [...path, key].join('.');

    switch (type) {
      case 'nested':
        return plain(children, [...path, key]);
      case 'added':
        return caseAdded(propertyPath, value);
      case 'removed':
        return caseRemoved(propertyPath);
      case 'changed':
        return caseChanged(propertyPath, value1, value2);
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  })
  .join('\n');

export default plain;
