import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    ignores: ['**/.nuxt/**'],
  },
  {
    languageOptions: {
      globals: {
        useHead: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        useFetch: 'readonly',
        useAsyncData: 'readonly',
        useCookie: 'readonly',
        definePageMeta: 'readonly',
        useSeoMeta: 'readonly',
        ref: 'readonly',
        Ref: 'readonly',
        onMounted: 'readonly',
        watch: 'readonly',
        computed: 'readonly',
        onBeforeUnmount: 'readonly',
        onBeforeMount: 'readonly',
        watchEffect: 'readonly',
      },
    },
  },
]);
