module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: 'google',
  globals: {
    SwaggerEditor: false
  },
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "object-shorthand": 0,
    "linebreak-style": 0,
    'max-len': 'off',
    "vue/max-attributes-per-line": "off",
  }
};
