module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'prettier', 'unused-imports'],
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'prettier/prettier': 'error',
    'react/no-unescaped-entities': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unsafe-declaration-merging': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern:
              '{@{api,apps,components,hooks,contexts,layouts,pages,icons,models,network}/**,@apps}',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
          order: 'asc',
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-unresolved': 'off',
    'import/namespace': 'off',
    'import/no-duplicates': 'off',
    'no-console': 'warn',
    'guard-for-in': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'react/react-in-jsx-scope': 'off',
    'unused-imports/no-unused-imports': 'warn',
  },
};
