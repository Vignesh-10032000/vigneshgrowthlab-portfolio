import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist*/**', 'node_modules/**', '.netlify/**', '.serena/**', 'audit/**', 'test-results/**', 'playwright-report/**'] },
  {
    ...js.configs.recommended,
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  { files: ['src/**/*.{js,jsx}'], languageOptions: { globals: globals.browser } },
  {
    files: ['src/**/*.jsx'],
    // Existing components may keep a React import under Vite's automatic JSX transform.
    rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }] },
  },
  {
    files: ['*.{js,mjs}', 'scripts/**/*.{js,mjs}', 'tests/**/*.{js,mjs}'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
];
