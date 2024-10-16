// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/brace-style': 'off',
    '@stylistic/quotes': 'off',
  },
});
