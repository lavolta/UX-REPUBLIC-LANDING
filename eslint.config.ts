import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfigWithVueTs(
  { name: 'app/files-to-lint', files: ['**/*.{ts,mts,tsx,vue,mjs}'] },
  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
  ]),
  ...pluginVue.configs['flat/recommended'],
  {
    name: 'app/vue-block-order',
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    },
  },
  vueTsConfigs.recommended,
  { ...pluginVitest.configs.recommended, files: ['src/**/__tests__/*'] },
  stylistic.configs.recommended,
  {
    name: 'app/vue-indent',
    files: ['**/*.{vue, scss}'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
    },
  },
)
