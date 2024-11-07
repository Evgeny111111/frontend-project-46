import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

function getData(filePath) {
  const resolvedPath = path.resolve(process.cwd(), filePath); // Делаем путь более читаемым
  if (filePath.endsWith('.json')) {
    return JSON.parse(
      fs.readFileSync(resolvedPath, 'utf8'), // Добавлена завершающая запятая
    ); // Читаем и парсим JSON файл
  }
  if (filePath.endsWith('.yml') || filePath.endsWith('.yaml')) {
    return yaml.load(
      fs.readFileSync(resolvedPath, 'utf8'), // Добавлена завершающая запятая
    ); // Читаем и парсим YAML файл
  }
  throw new Error('Unsupported file format'); // Обрабатываем неподдерживаемые форматы
}
export default getData; // Убедитесь, что в конце файла нет пустых строк
