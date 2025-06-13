import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import nuxt from 'eslint-plugin-nuxt'
import parser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ['**/node_modules/**', '**/.nuxt/**', '**/dist/**', '**/.output/**']
  },
  js.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser, // вложенный TS-парсер
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        extraFileExtensions: ['.vue']
      },
      globals: {
        defineNuxtConfig: 'readonly',
        defineNuxtRouteMiddleware: 'readonly',
        navigateTo: 'readonly',
        defineEventHandler: 'readonly',
        readBody: 'readonly',
        useRuntimeConfig: 'readonly',
        $fetch: 'readonly',
        useState: 'readonly'
      }
    },
    plugins: {
      vue,
      nuxt
    },
    rules: {
      'no-console': 'warn',
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    }
  }
]
