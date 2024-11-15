import stylish from './stylish.js';
import plain from './plain.js';
import JsonFormatter from './JSON.js';

const formatters = {
  json: JsonFormatter,
  plain: (difference) => plain(difference).trim(),
  stylish,
};

function format(difference, formatName = 'stylish') {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Format name ${formatName} doesn't exist`);
  }
  return formatter(difference);
}

export default format;
