import yaml from 'js-yaml';

const getFileInfo = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Invalid extension - ${format}`);
  }
};

export default getFileInfo;
