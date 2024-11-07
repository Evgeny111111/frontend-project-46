import { expect, test } from '@jest/globals';
import parsePaths from '../src/index.js';

const answerNestedJSON = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const answerPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const answerJSON = '[{"key":"common","type":"nested","value":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"removed","value":200},{"key":"setting3","type":"changed","value":null,"prevValue":true},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nested","value":[{"key":"doge","type":"nested","value":[{"key":"wow","type":"changed","value":"so much","prevValue":""}]},{"key":"key","type":"unchanged","value":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"nested","value":[{"key":"baz","type":"changed","value":"bars","prevValue":"bas"},{"key":"foo","type":"unchanged","value":"bar"},{"key":"nest","type":"changed","value":"str","prevValue":{"key":"value"}}]},{"key":"group2","type":"removed","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

test.each([
  ['./__fixtures__/file1_nested.json', './__fixtures__/file2_nested.json', 'stylish'],
  ['./__fixtures__/file1_nested.yml', './__fixtures__/file2_nested.yml', 'stylish'],
])('Make difference nested structures JSON/YAML', (filePath1, filePath2) => {
  expect(parsePaths(filePath1, filePath2)).toEqual(answerNestedJSON);
});

test('parsePaths(filepath1, filepath2)', () => {
  expect(parsePaths('./__fixtures__/file1_nested.json', './__fixtures__/file2_nested.json')).toEqual(answerNestedJSON);
});

test('Make difference nested structures JSON with format plain', () => {
  expect(parsePaths('./__fixtures__/file1_nested.json', './__fixtures__/file2_nested.json', 'plain')).toEqual(answerPlain);
});

test('Make difference nested structures JSON with format json', () => {
  expect(parsePaths('./__fixtures__/file1_nested.json', './__fixtures__/file2_nested.json', 'json')).toEqual(answerJSON);
});
