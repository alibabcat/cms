import type { Payload } from 'payload'

/**
 * Shared dependencies passed to every seeder so they don't each have to wire up
 * the Payload instance or the image uploader.
 */
export interface SeedContext {
  payload: Payload
  /** Download an image URL, upload it to a media collection, return its id. */
  getMediaId: (url: string, alt: string, collection?: 'media' | 'blog-media') => Promise<string>
}
