import yaml from 'js-yaml';

const getFileInfo = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Invalid extension - ${format}`);
  }
};

export default getFileInfo;
