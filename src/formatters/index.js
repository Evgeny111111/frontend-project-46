import stylish from './stylish.js';
import plain from './plain.js';
import JsonFormatter from './JSON.js';

function format(difference, formatName = 'stylish') {
  switch (formatName) {
    case 'stylish':
      return stylish(difference);
    case 'plain':
      return plain(difference);
    case 'json':
      return JsonFormatter(difference);
    default:
      throw new Error(`Format name ${formatName} doesn't exist`);
  }
}

export default format;
