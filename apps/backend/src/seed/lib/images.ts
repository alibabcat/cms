import { request as httpsRequest } from 'node:https'
import { request as httpRequest } from 'node:http'
import { createHash } from 'node:crypto'
import { SocksProxyAgent } from 'socks-proxy-agent'
import type { Payload } from 'payload'

// ---------------------------------------------------------------------------
// Image helpers: download (optionally through a SOCKS5 proxy) + upload to the
// `media` collection, returning the created media doc id. Results are cached by
// URL so a repeated image (e.g. an author photo reused across posts) is only
// downloaded and uploaded once.
// ---------------------------------------------------------------------------

const SOCKS5_PROXY =
  process.env.SOCKS5_PROXY || process.env.SOCKS_PROXY || process.env.ALL_PROXY || ''

const proxyAgent = SOCKS5_PROXY ? new SocksProxyAgent(SOCKS5_PROXY) : undefined

if (SOCKS5_PROXY) {
  console.log(`🧦 Using SOCKS5 proxy for image downloads: ${SOCKS5_PROXY}`)
}

const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
}

function downloadImage(
  url: string,
  redirectsLeft = 5,
): Promise<{ buffer: Buffer; contentType: string }> {
  return new Promise((resolve, reject) => {
    const target = new URL(url)
    const requestFn = target.protocol === 'http:' ? httpRequest : httpsRequest
    const req = requestFn(
      url,
      {
        agent: proxyAgent,
        headers: { 'User-Agent': 'Mozilla/5.0 (kiawosch-seed-script)' },
      },
      (res) => {
        const status = res.statusCode ?? 0

        // Follow redirects
        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume()
          if (redirectsLeft <= 0) {
            reject(new Error(`Too many redirects for ${url}`))
            return
          }
          const next = new URL(res.headers.location, url).toString()
          resolve(downloadImage(next, redirectsLeft - 1))
          return
        }

        if (status !== 200) {
          res.resume()
          reject(new Error(`HTTP ${status} downloading ${url}`))
          return
        }

        const chunks: Buffer[] = []
        res.on('data', (chunk) => chunks.push(chunk as Buffer))
        res.on('end', () =>
          resolve({
            buffer: Buffer.concat(chunks),
            contentType: (res.headers['content-type'] || 'image/jpeg').split(';')[0].trim(),
          }),
        )
        res.on('error', reject)
      },
    )
    req.on('error', reject)
    req.setTimeout(30_000, () => req.destroy(new Error(`Timeout downloading ${url}`)))
    req.end()
  })
}

type UploadCollection = 'media' | 'blog-media'

export function createImageUploader(payload: Payload) {
  // Cache is keyed by collection + url so the same image can live in both the
  // general and blog media libraries if needed.
  const cache = new Map<string, string>()

  return async function getMediaId(
    url: string,
    alt: string,
    collection: UploadCollection = 'media',
  ): Promise<string> {
    const cacheKey = `${collection}:${url}`
    const cached = cache.get(cacheKey)
    if (cached !== undefined) return cached

    const { buffer, contentType } = await downloadImage(url)
    const ext = EXT_BY_MIME[contentType] || 'jpg'
    const name = `seed-${createHash('sha1').update(url).digest('hex').slice(0, 16)}.${ext}`

    const media = await payload.create({
      collection,
      data: { alt },
      file: {
        data: buffer,
        mimetype: contentType,
        name,
        size: buffer.length,
      },
    })

    const id = String(media.id)
    cache.set(cacheKey, id)
    return id
  }
}
