module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'filenames'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,

    'comma-dangle': ['error', 'always-multiline'],

    'filenames/match-exported': [1, 'kebab'],
    
     // Правила для иммутабельности (предупреждения)
    'no-param-reassign': ['warn', { 
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // для reduce accumulator
        'accumulator', 
        'e', // для событий
        'ctx', // для контекста
        'req', // для Express requests
        'request', 
        'res', // для Express responses
        'response'
      ]
    }],
    'prefer-const': 'warn',
    'no-var': 'error',
  },
  ignorePatterns: [
    'packages/*/dist/',
    'node_modules/',
    '*.js.map',
    '*.d.ts.map',
  ],
};
