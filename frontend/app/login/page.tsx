'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { LogoIcon } from '@/components/shared/LogoIcon'
import Link from 'next/link'
import clsx from 'clsx'

type Mode = 'login' | 'register'

export default function LoginPage() {
  const router = useRouter()
  const { login, register, loginWithGoogle, loginWithFacebook, isLoading } = useAuth()

  const [mode, setMode] = useState<Mode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (mode === 'register' && form.password !== form.confirm) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }
    try {
      if (mode === 'register') {
        await register(form.email, form.password, form.name)
      } else {
        await login(form.email, form.password)
      }
      router.push('/')
    } catch (err: any) {
      setError(mode === 'register' ? (err.message || 'Lỗi đăng ký') : 'Email hoặc mật khẩu không đúng')
    }
  }

  const handleGoogle = async () => {
    await loginWithGoogle()
    router.push('/')
  }

  const handleFacebook = async () => {
    await loginWithFacebook()
    router.push('/')
  }

  const inputCls =
    'w-full bg-cream border-[1.5px] border-navy/[0.12] rounded-xl px-4 py-3 pl-11 text-sm text-navy outline-none transition-colors duration-200 focus:border-navy focus:bg-white font-sans'

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0F172A 0%, #1a0a0a 60%, #2d0a0a 100%)',
        }}
      >
        <div className="absolute inset-0 dot-texture pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-3 no-underline">
          <LogoIcon size={40} />
          <span className="font-serif text-2xl font-bold text-white">
            VIỆT SỬ <span className="text-gold">SỐ</span>
          </span>
        </Link>

        {/* Quote */}
        <div className="relative">
          <div className="w-12 h-1 bg-gold mb-8" />
          <blockquote className="font-serif text-3xl text-white font-semibold leading-[1.35] mb-6">
            "Ký ức cộng đồng — Di sản số bền vững"
          </blockquote>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm">
            Tham gia cùng hàng trăm nhân chứng, giáo viên và nhà nghiên cứu trong hành trình
            bảo tồn lịch sử Việt Nam.
          </p>
        </div>

        {/* Stats */}
        <div className="relative flex gap-8">
          {[
            { num: '138+', label: 'Thành viên' },
            { num: '47', label: 'Ký ức số hoá' },
            { num: '2', label: 'Trường thí điểm' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl font-bold text-gold">{s.num}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-cream">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2.5 no-underline mb-8">
            <LogoIcon size={32} />
            <span className="font-serif text-lg font-bold text-navy">
              VIỆT SỬ <span className="text-gold">SỐ</span>
            </span>
          </Link>

          {/* Mode toggle */}
          <div className="flex bg-white border border-navy/[0.08] rounded-xl p-1 mb-8">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                className={clsx(
                  'flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer border-none',
                  mode === m
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-transparent text-slate-400 hover:text-navy'
                )}
              >
                {m === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-serif text-[28px] font-bold text-navy mb-1">
                {mode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản'}
              </h2>
              <p className="text-sm text-slate-400 mb-7">
                {mode === 'login'
                  ? 'Đăng nhập để tiếp tục hành trình lịch sử'
                  : 'Tham gia cộng đồng Việt Sử Số'}
              </p>

              {/* Social buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleGoogle}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2.5 bg-white border border-navy/[0.12]
                             rounded-xl py-3 text-sm font-medium text-navy cursor-pointer
                             hover:border-navy/30 hover:shadow-sm transition-all duration-200 disabled:opacity-50"
                >
                  {/* Google SVG icon */}
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.165 6.656 3.58 9 3.58z"/>
                  </svg>
                  Google
                </button>
                <button
                  onClick={handleFacebook}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2.5 bg-[#1877F2] border border-[#1877F2]
                             rounded-xl py-3 text-sm font-medium text-white cursor-pointer
                             hover:bg-[#166FE5] transition-all duration-200 disabled:opacity-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-navy/[0.08]" />
                <span className="text-xs text-slate-400">hoặc dùng email</span>
                <div className="flex-1 h-px bg-navy/[0.08]" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input className={inputCls} placeholder="Họ và tên" value={form.name} onChange={set('name')} required />
                  </div>
                )}

                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input className={inputCls} type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
                </div>

                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    className={inputCls}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mật khẩu"
                    value={form.password}
                    onChange={set('password')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy cursor-pointer bg-none border-none p-0"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {mode === 'register' && (
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      className={inputCls}
                      type="password"
                      placeholder="Xác nhận mật khẩu"
                      value={form.confirm}
                      onChange={set('confirm')}
                      required
                    />
                  </div>
                )}

                {/* Error */}
                {error && (
                  <p className="text-sm text-red-vss bg-red-50 px-4 py-2.5 rounded-lg">{error}</p>
                )}

                {/* Forgot password */}
                {mode === 'login' && (
                  <div className="text-right">
                    <a className="text-xs text-slate-400 hover:text-navy cursor-pointer transition-colors">
                      Quên mật khẩu?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-vss text-white rounded-full py-3.5 text-sm font-semibold
                             flex items-center justify-center gap-2 cursor-pointer border-none
                             transition-all duration-200 hover:bg-red-light hover:-translate-y-px
                             disabled:opacity-60 disabled:cursor-not-allowed
                             shadow-[0_4px_16px_rgba(185,28,28,0.3)]"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {mode === 'register' && (
                <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">
                  Bằng cách đăng ký, bạn đồng ý với{' '}
                  <a className="text-navy underline cursor-pointer">Điều khoản sử dụng</a> và{' '}
                  <a className="text-navy underline cursor-pointer">Chính sách bảo mật</a>
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
