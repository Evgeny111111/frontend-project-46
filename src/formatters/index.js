import stylish from './stylish.js';
import plain from './plain.js';
import JsonFormatter from './JSON.js';

function format(difference, formatName = 'stylish') {
  const formatter = (() => {
    switch (formatName) {
      case 'stylish':
        return stylish;
      case 'plain':
        return (diff) => plain(diff).trim();
      case 'json':
        return JsonFormatter;
      default:
        throw new Error(`Format name ${formatName} doesn't exist`);
    }
  })();

  return formatter(difference);
}

export default format;
