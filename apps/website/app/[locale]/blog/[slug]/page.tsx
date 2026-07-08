import { notFound } from 'next/navigation'
import { getBlogPostById } from '@/lib/payload'
import { parsePreviewParams } from '@/lib/preview'
import { getServerLocale } from '@/lib/locale'
import { RefreshOnSave } from '@/components/RefreshOnSave'
import BlogPostDetail from '@/components/BlogPost'

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params
  const { preview, locale: previewLocale } = parsePreviewParams(await searchParams)
  const locale = previewLocale ?? (await getServerLocale())
  const post = await getBlogPostById(slug, { locale, draft: preview })
  if (!post) notFound()
  return (
    <>
      <BlogPostDetail post={post} />
      {preview && <RefreshOnSave />}
    </>
  )
}
