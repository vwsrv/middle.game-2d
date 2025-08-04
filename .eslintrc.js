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
    
    'filenames/match-regex': [1, '^[a-z][a-z0-9-]*[a-z0-9](\\.[a-z0-9]+)*$', true],
    'filenames/match-exported': [1, 'kebab'],
  },
  ignorePatterns: ['packages/*/dist/', 'node_modules/', '*.js.map', '*.d.ts.map'],
}
