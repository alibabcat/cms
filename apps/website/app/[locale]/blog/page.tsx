import BlogPage from '@/components/BlogPage'
import { getBlogPosts } from '@/lib/payload'
import { getServerLocale } from '@/lib/locale'

export default async function BlogListPage() {
  const locale = await getServerLocale()
  let posts: Awaited<ReturnType<typeof getBlogPosts>> = []
  try {
    posts = await getBlogPosts({ locale })
  } catch {
    posts = []
  }
  return <BlogPage posts={posts} />
}
