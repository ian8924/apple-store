module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '*-test.js',
        '*.spec.js'
      ],
      rules: {
        'no-unused-expressions': 'off',
        'no-undef': 'off'
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
