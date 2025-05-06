import eslint from '@eslint/js';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import typescriptESLint from 'typescript-eslint';

export default typescriptESLint.config([
  eslint.configs.recommended,
  typescriptESLint.configs.recommended,

  {
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      'import': pluginImport,
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Enforce consistent usage of type imports
      '@typescript-eslint/consistent-type-imports': 'error',

      // Ensure the `type` keyword is always outside the import braces
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

      // Enforce consistent import order
      'import/order': [
        'error',
        {
          'alphabetize': {
            caseInsensitive: true,
            order: 'asc',
          },
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'never',
        },
      ],
    },
  },

  {
    plugins: {
      react: pluginReact,
    },
    rules: pluginReact.configs['jsx-runtime'].rules,
  },

  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Enforce shorthand boolean component properties
      'react/jsx-boolean-value': ['error', 'never'],

      // Ensure component properties are alphabetically sorted with callbacks being last
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
        },
      ],
    },
  },

  // Include Prettier validation in the linting pipeline
  pluginPrettier,
]);
