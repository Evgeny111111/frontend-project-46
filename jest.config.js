export default {
  collectCoverage: true,
  coverageDirectory: 'coverage', // Директория для хранения отчетов о покрытии
  coverageProvider: 'v8', // Использование V8 для сбора покрытия
  collectCoverageFrom: [
    'src/**/*.{js,jsx}', // Путь к вашим файлам исходного кода
    '!src/index.js', // Исключите файлы, которые не нужно учитывать в покрытии
  ],
};
