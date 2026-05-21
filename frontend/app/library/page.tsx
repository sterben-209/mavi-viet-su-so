'use client'

import { useContributeModal } from '@/hooks/useContributeModal'
import { Navbar } from '@/components/shared/Navbar'
import { MobileCtaBar } from '@/components/shared/MobileCtaBar'
import { Footer } from '@/components/shared/Footer'
import { ContributeModal } from '@/components/contribute/ContributeModal'
import { FilterBar } from '@/components/library/FilterBar'
import { FeaturedCard } from '@/components/library/FeaturedCard'
import { PostCard } from '@/components/library/PostCard'
import { POSTS } from '@/lib/data'

export default function LibraryPage() {
  const { isOpen, open, close } = useContributeModal()

  const featured = POSTS.find((p) => p.featured)!
  const grid = POSTS.filter((p) => !p.featured)

  return (
    <>
      <Navbar onContributeClick={open} />
      <MobileCtaBar onClick={open} />

      <main className="pb-14 md:pb-0">
        {}
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

        {}
        <div className="bg-cream px-[8vw] py-12">
          <FeaturedCard post={featured} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grid.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>

          <div className="text-center mt-14">
            <button
              className="px-9 py-3 border-[1.5px] border-navy/25 rounded-full text-sm font-semibold
                         text-navy bg-transparent cursor-pointer transition-all duration-300
                         hover:bg-navy hover:text-white hover:border-navy"
            >
              Tải thêm bài đăng
            </button>
          </div>
        </div>
      </main>

      <Footer onContributeClick={open} minimal />
      <ContributeModal isOpen={isOpen} onClose={close} />
    </>
  )
}
