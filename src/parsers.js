import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';
function getData(str) {
  let data = {};
	const dirName = process.cwd(str);
	if (str.endsWith('.json')) {
		str.startsWith('/') ? data = path.resolve(str) : data = path.resolve(dirName, str);
    return JSON.parse(fs.readFileSync(data));
  }
	if (str.endsWith('.yml') || str.endsWith('.yaml')) {
		str.startsWith('/') ? data = path.resolve(str) : data = path.resolve(dirName, str);
    return yaml.load(fs.readFileSync(data));
	}
}
export default getData;
// gendiff __fixtures__/file1.yml __fixtures__/file2.yml
// gendiff __fixtures__/file1.json __fixtures__/file2.json