'use client'

import { useEffect, useState } from 'react'
import { useContributeModal } from '@/hooks/useContributeModal'
import { Navbar } from '@/components/shared/Navbar'
import { MobileCtaBar } from '@/components/shared/MobileCtaBar'
import { Footer } from '@/components/shared/Footer'
import { ContributeModal } from '@/components/contribute/ContributeModal'
import { FilterBar } from '@/components/library/FilterBar'
import { FeaturedCard } from '@/components/library/FeaturedCard'
import { PostCard } from '@/components/library/PostCard'
import { fetchPosts } from '@/lib/api'
import type { Post } from '@/types'
import { Loader2 } from 'lucide-react'

export default function LibraryPage() {
  const { isOpen, open, close } = useContributeModal()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      const data = await fetchPosts()
      setPosts(data)
      setLoading(false)
    }
    loadPosts()
  }, [])

  const featured = posts.find((p) => p.featured) || posts[0]
  const grid = posts.filter((p) => p.id !== featured?.id)

  return (
    <>
      <Navbar onContributeClick={open} />
      <MobileCtaBar onClick={open} />

      <main className="pb-14 md:pb-0">
        <div className="relative bg-navy px-[8vw] pt-[120px] pb-16 overflow-hidden">
          <div className="absolute inset-0 dot-texture pointer-events-none" />
          <p className="relative text-xs text-white/35 tracking-[0.05em] mb-5">
            Trang Chủ ›{' '}
            <span className="text-gold">Thư Viện Học Liệu</span>
          </p>
          <h1
            className="relative font-serif font-bold text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
          >
            Thư Viện Học Liệu
          </h1>
          <p className="relative text-base text-white/55 max-w-[480px] mt-3">
            Kho tư liệu lịch sử địa phương được biên tập theo chuẩn sư phạm
          </p>
        </div>

        <FilterBar />

        <div className="bg-cream px-[8vw] py-12 min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-gold mb-4" />
              <p className="text-navy/50 text-sm font-medium">Đang tải học liệu...</p>
            </div>
          ) : posts.length > 0 ? (
            <>
              {featured && <FeaturedCard post={featured} />}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {grid.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>

              {posts.length > 9 && (
                <div className="text-center mt-14">
                  <button
                    className="px-9 py-3 border-[1.5px] border-navy/25 rounded-full text-sm font-semibold
                               text-navy bg-transparent cursor-pointer transition-all duration-300
                               hover:bg-navy hover:text-white hover:border-navy"
                  >
                    Tải thêm bài đăng
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-navy/50">Không tìm thấy bài viết nào.</p>
            </div>
          )}
        </div>
      </main>

      <Footer onContributeClick={open} minimal />
      <ContributeModal isOpen={isOpen} onClose={close} />
    </>
  )
}
