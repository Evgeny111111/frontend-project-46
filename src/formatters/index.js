import stylish from './stylish.js';
import plain from './plain.js';
import JsonFormatter from './JSON.js';

function format(difference, formatName = 'stylish') {
  switch (formatName) {
    case 'json':
      return JsonFormatter(difference);
    case 'plain':
      return plain(difference).trim();
    case 'stylish':
      return stylish(difference);
    default:
      throw new Error(`Format name ${formatName} doesn't exist`);
  }
}

export default format;
