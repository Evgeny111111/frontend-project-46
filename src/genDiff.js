import _ from 'lodash';

function gen(obj1, obj2) {
  const keys1 = _.sortBy(Object.keys(obj1));
  const keys2 = _.sortBy(Object.keys(obj2));
  const unionKeys = _.union(keys1, keys2);

  return _.sortBy(unionKeys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        value: gen(obj1[key], obj2[key]),
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) { // Заменили условие
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key,
        type: 'removed',
        value: obj1[key],
      };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        type: 'unchanged',
        value: obj1[key],
      };
    }
    return {
      key,
      type: 'changed',
      value: obj2[key],
      prevValue: obj1[key],
    };
  }), 'key');
}

export default gen;
