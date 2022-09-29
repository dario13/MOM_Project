module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    '.eslintrc.js',
    'tsconfig.json',
    'jest.config.js',
    'jest.setup.js',
    'next.config.js',
    'postcss.config.js',
    'tailwind.config.js',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'standard',
    'prettier',
    'plugin:storybook/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  globals: {
    __DEV__: false,
    beforeAll: false,
    afterAll: false,
    beforeEach: false,
    afterEach: false,
    test: false,
    expect: false,
    describe: false,
    jest: false,
    it: false,
    JSX: true,
  },
  rules: {
    'react/prop-types': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
