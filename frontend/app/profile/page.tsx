'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Edit2, Save, X, LogOut, MapPin, Calendar, BookOpen, Shield } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Navbar } from '@/components/shared/Navbar'
import { useContributeModal } from '@/hooks/useContributeModal'
import { ContributeModal } from '@/components/contribute/ContributeModal'
import { Footer } from '@/components/shared/Footer'
import { POSTS } from '@/lib/data'
import { PostCard } from '@/components/library/PostCard'
import clsx from 'clsx'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout, updateProfile } = useAuth()
  const { isOpen, open, close } = useContributeModal()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name ?? '', bio: user?.bio ?? '', province: user?.province ?? '' })
  const [activeTab, setActiveTab] = useState<'contributions' | 'settings'>('contributions')

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="font-serif text-2xl font-bold text-navy mb-2">Chưa đăng nhập</h2>
          <p className="text-slate-400 text-sm mb-6">Vui lòng đăng nhập để xem trang cá nhân</p>
          <Link href="/login" className="inline-block bg-red-vss text-white px-8 py-3 rounded-full text-sm font-semibold no-underline hover:bg-red-light transition-colors">
            Đăng Nhập
          </Link>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    updateProfile(form)
    setEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const myPosts = POSTS.slice(0, user.contributions > 3 ? 3 : user.contributions)

  return (
    <>
      <Navbar onContributeClick={open} />
      <main className="pt-[68px] pb-14 md:pb-0 min-h-screen bg-cream">
        {/* Profile header */}
        <div
          className="relative px-[8vw] pt-16 pb-24 overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)' }}
        >
          <div className="absolute inset-0 dot-texture pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gold/20 border-4 border-gold/40 flex items-center justify-center text-3xl font-bold font-serif text-gold">
                {user.name.charAt(0)}
              </div>
              {user.role === 'admin' && (
                <div className="absolute -bottom-1 -right-1 bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Shield size={9} /> ADMIN
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              {editing ? (
                <input
                  className="font-serif text-3xl font-bold bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1 outline-none mb-2 w-full max-w-xs"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              ) : (
                <h1 className="font-serif text-3xl font-bold text-white mb-1">{user.name}</h1>
              )}
              <p className="text-white/50 text-sm mb-3">{user.email}</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Calendar size={13} /> Tham gia {user.joinDate}</span>
                <span className="flex items-center gap-1.5"><MapPin size={13} /> {user.province || 'Chưa cập nhật'}</span>
                <span className="flex items-center gap-1.5"><BookOpen size={13} /> {user.contributions} đóng góp</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-shrink-0">
              {editing ? (
                <>
                  <button onClick={handleSave} className="flex items-center gap-1.5 bg-gold text-navy px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none hover:bg-gold-light transition-colors">
                    <Save size={14} /> Lưu
                  </button>
                  <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 bg-white/10 text-white px-4 py-2 rounded-full text-sm cursor-pointer border-none hover:bg-white/20 transition-colors">
                    <X size={14} /> Huỷ
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 bg-white/10 text-white px-4 py-2 rounded-full text-sm cursor-pointer border border-white/20 hover:bg-white/20 transition-colors">
                    <Edit2 size={14} /> Chỉnh sửa
                  </button>
                  <button onClick={handleLogout} className="flex items-center gap-1.5 bg-red-vss text-white px-4 py-2 rounded-full text-sm cursor-pointer border-none hover:bg-red-light transition-colors">
                    <LogOut size={14} /> Đăng xuất
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-white border-b border-navy/[0.08] px-[8vw]">
          <div className="flex gap-8 -mt-6">
            {[
              { num: user.contributions, label: 'Đóng góp' },
              { num: '1.2K', label: 'Lượt xem' },
              { num: '12', label: 'Được duyệt' },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-navy/[0.08] rounded-xl px-6 py-4 text-center shadow-sm">
                <div className="font-serif text-2xl font-bold text-navy">{s.num}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-navy/[0.08] px-[8vw]">
          <div className="flex gap-6 pt-6">
            {[
              { key: 'contributions', label: 'Bài đóng góp' },
              { key: 'settings', label: 'Thông tin cá nhân' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={clsx(
                  'pb-3 text-sm font-semibold border-b-2 cursor-pointer bg-transparent border-x-0 border-t-0 transition-all duration-200',
                  activeTab === tab.key
                    ? 'border-red-vss text-red-vss'
                    : 'border-transparent text-slate-400 hover:text-navy'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-[8vw] py-10">
          {activeTab === 'contributions' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {myPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myPosts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">📝</div>
                  <h3 className="font-serif text-xl font-bold text-navy mb-2">Chưa có đóng góp</h3>
                  <p className="text-slate-400 text-sm mb-6">Hãy chia sẻ ký ức lịch sử của bạn</p>
                  <button onClick={open} className="bg-red-vss text-white px-6 py-3 rounded-full text-sm font-semibold cursor-pointer border-none hover:bg-red-light transition-colors">
                    Đóng Góp Ngay
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg">
              <div className="bg-white rounded-2xl border border-navy/[0.08] p-6 space-y-5">
                <h3 className="font-serif text-xl font-bold text-navy">Thông Tin Cá Nhân</h3>

                {[
                  { label: 'Họ và tên', key: 'name', value: form.name, placeholder: 'Nhập họ tên' },
                  { label: 'Địa phương', key: 'province', value: form.province, placeholder: 'Tỉnh / Thành phố' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{field.label}</label>
                    {editing ? (
                      <input
                        className="w-full bg-cream border-[1.5px] border-navy/[0.12] rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-navy"
                        value={field.value}
                        placeholder={field.placeholder}
                        onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-navy py-2.5 border-b border-navy/[0.06]">{field.value || <span className="text-slate-300">Chưa cập nhật</span>}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Giới thiệu</label>
                  {editing ? (
                    <textarea
                      className="w-full bg-cream border-[1.5px] border-navy/[0.12] rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-navy resize-none min-h-[90px]"
                      value={form.bio}
                      placeholder="Giới thiệu bản thân..."
                      onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm text-navy py-2.5 border-b border-navy/[0.06]">{form.bio || <span className="text-slate-300">Chưa cập nhật</span>}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
                  <p className="text-sm text-navy/50 py-2.5">{user.email} <span className="text-[11px] text-slate-300">(không thể thay đổi)</span></p>
                </div>

                {!editing && (
                  <button onClick={() => setEditing(true)} className="w-full bg-navy text-white rounded-full py-3 text-sm font-semibold cursor-pointer border-none hover:bg-navy-mid transition-colors flex items-center justify-center gap-2">
                    <Edit2 size={14} /> Chỉnh sửa thông tin
                  </button>
                )}
                {editing && (
                  <div className="flex gap-3">
                    <button onClick={handleSave} className="flex-1 bg-red-vss text-white rounded-full py-3 text-sm font-semibold cursor-pointer border-none hover:bg-red-light transition-colors">Lưu thay đổi</button>
                    <button onClick={() => setEditing(false)} className="flex-1 bg-cream text-navy rounded-full py-3 text-sm font-semibold cursor-pointer border border-navy/15 hover:border-navy transition-colors">Huỷ</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer onContributeClick={open} minimal />
      <ContributeModal isOpen={isOpen} onClose={close} />
    </>
  )
}
