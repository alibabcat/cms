import type { NextConfig } from 'next'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// Next.js only auto-loads .env from the app directory (apps/website). This
// monorepo keeps shared env in the root .env, so load it here too. Existing
// process.env values win (root .env never overrides real environment vars).
const rootEnvPath = path.resolve(dirname, '../../.env')
try {
  const raw = fs.readFileSync(rootEnvPath, 'utf8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (process.env[key] === undefined) {
      process.env[key] = val
    }
  }
} catch {
  // No root .env — fine, fall back to real environment vars only.
}

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.resolve(dirname, '../../'),
  reactStrictMode: true,
    images: {
      dangerouslyAllowLocalIP: true,
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '5000',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '5001',
          pathname: '/**',
        },
      ],
    },

}

export default nextConfig
