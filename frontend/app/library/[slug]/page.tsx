import { PostDetailClient } from '@/components/library/PostDetailClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params
  return <PostDetailClient slug={slug} />
}
