const {eslint, deepmerge} = require('@ice/spec');

module.exports = deepmerge(eslint, {
  rules: {
    'semi': [2, 'always'],
    'quotes': ['warn', 'single'],
    'indent': ['warn', 2, {'SwitchCase': 1, 'flatTernaryExpressions': true,}],
  },
});
