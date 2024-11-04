import eslintConfigAirbnbBase from 'eslint-config-airbnb-base';
import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      // Укажите правила ESLint, которые вам нужны, например:
      ...eslintConfigAirbnbBase.rules,
      'no-console': 'off',
      'import/extensions': 'off',
    },
  },
];
