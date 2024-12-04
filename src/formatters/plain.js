import _ from 'lodash';

// Функция для преобразования значений в читаемый вид
function isObject(value) {
  if (value === null) {
    return 'null'; // Явное представление отсутствующего значения
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (Array.isArray(value)) {
    return '[array value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
}

// Форматтер для генерации plain-вывода
function plain(difference, pathDepth = '') {
  const result = difference.map((element) => {
    const fullPath = pathDepth ? `${pathDepth}.${element.key}` : element.key;

    switch (element.type) {
      case 'nested': // Рекурсивно обрабатываем вложенные элементы
        return plain(element.value, fullPath);
      case 'added': // Обрабатываем добавленные свойства
        return `Property '${fullPath}' was added with value: ${isObject(element.value)}`;
      case 'removed': // Обрабатываем удалённые свойства
        return `Property '${fullPath}' was removed`;
      case 'changed': // Обрабатываем обновлённые свойства
        return `Property '${fullPath}' was updated. From ${isObject(element.prevValue)} to ${isObject(element.value)}`;
      case 'unchanged': // Пропускаем неизменённые свойства
        return '';
      default: // Выбрасываем ошибку при неизвестном типе элемента
        throw new Error(`Element type '${element.type}' doesn't exist`);
    }
  });

  // Фильтруем пустые строки и объединяем результаты в итоговый вывод
  return result.filter((line) => line !== '').join('\n');
}

export default plain;
