import _ from 'lodash';

function genDiff(data1, data2) {
  const keys1 = _.sortBy(Object.keys(data1));
  const keys2 = _.sortBy(Object.keys(data2));
  const unionKeys = _.union(keys1, keys2);

  return _.sortBy(unionKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: genDiff(data1[key], data2[key]),
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    }
    return {
      key,
      type: 'changed',
      value1: data1[key],
      value2: data2[key],
    };
  }), 'key');
}

export default genDiff;
