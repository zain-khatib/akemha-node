module.exports = {
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'airbnb-base'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  rules: {
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-useless-constructor': 'off',
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
    'max-len': ['error', { code: 150 }],
    // windows linebreaks when not in production environment
    "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
  }
};
