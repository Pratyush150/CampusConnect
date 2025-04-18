import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Ignores the 'dist' directory from linting
  { ignores: ['dist'] },

  // Configuration for JS/JSX files
  {
    files: ['**/*.{js,jsx}'], // Targeting all .js and .jsx files
    languageOptions: {
      ecmaVersion: 2020, // Allows ES2020 syntax
      globals: globals.browser, // Defines global variables for the browser environment
      parserOptions: {
        ecmaVersion: 'latest', // Supports the latest ECMAScript version
        ecmaFeatures: { jsx: true }, // Supports JSX syntax
        sourceType: 'module', // Enables ES module syntax
      },
    },
    plugins: {
      'react-hooks': reactHooks, // Adding the react-hooks plugin
      'react-refresh': reactRefresh, // Adding the react-refresh plugin for Fast Refresh
    },
    rules: {
      ...js.configs.recommended.rules, // Use ESLint's recommended rules for JS
      ...reactHooks.configs.recommended.rules, // Use recommended rules for React hooks
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // Disallows unused vars unless they match the pattern (e.g., constants)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Warns if a component is not exported properly but allows constant exports
      ],
    },
  },
];
