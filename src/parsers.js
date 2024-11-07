import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function getData(filePath) {
  let resolvedPath;
  // Разрешаем путь к файлу
  if (filePath.startsWith('/')) {
    resolvedPath = path.resolve(filePath);
  } else {
    resolvedPath = path.resolve(process.cwd(), filePath);
  }
  // Чтение файла в зависимости от его расширения
  if (filePath.endsWith('.json')) {
    return JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));
  }
  if (filePath.endsWith('.yml') || filePath.endsWith('.yaml')) {
    return yaml.load(fs.readFileSync(resolvedPath, 'utf-8'));
  }
  // Если тип файла не поддерживается, выбрасываем ошибку
  throw new Error(`Unsupported file type: ${filePath}`);
}
export default getData;
