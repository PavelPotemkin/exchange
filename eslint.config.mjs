import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: {
      semi: false,
      indent: 2,
      quotes: 'single',
    },
    tooling: true,
  },
}).overrideRules({
  'vue/no-multiple-template-root': 'off',
  'vue/multi-word-component-names': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
})
