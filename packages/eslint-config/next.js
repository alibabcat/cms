import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import { baseRules } from './base.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

/** @type {import("eslint").Linter.Config[]} */
export const nextConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...baseRules,
]
