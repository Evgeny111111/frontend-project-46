import stylish from './stylish.js';
import plain from './plain.js';

function format(data, formatName) {
  switch (formatName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Format name ${formatName} doesn't exist`);
  }
}

export default format;
