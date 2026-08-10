'use client'

import { useEffect, useState, useRef } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const INK = '#FFFFFF'
const CHAMPAGNE = '#9e8f51'

// 👑 定义两个 WhatsApp 联系号码
const WHATSAPP_URL_1 = 'https://wa.me/60103268811' // Agent 1
const WHATSAPP_URL_2 = 'https://wa.me/60162766193' // 🎯 换成你的第 2 个 WhatsApp 手机号

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Residences', href: '#residences' },
  { label: 'FAQs', href: '#faqs' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [navContactOpen, setNavContactOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const contactDropdownRef = useRef<HTMLDivElement>(null)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.replace('#', '') 
      
      if (targetId === 'home') {
        const element = document.getElementById('home')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return
      }

      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  // 点击外部收起 Contact Us 下拉框
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(e.target as Node)) {
        setNavContactOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (open) return

      const currentScrollY = window.scrollY
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
        setNavContactOpen(false) // 往下滚动时顺便关掉联系菜单
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setNavContactOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >  
      <div className="h-full w-full border-b border-white/5 bg-[#1A1A1A]/80 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-5 md:h-14 md:px-8">
          
          <div 
            onClick={(e) => handleNavClick(e as any, '#home')}
            className="cursor-pointer transition-transform duration-300 hover:scale-102 active:scale-98 block focus:outline-none"
          >
            <Logo inverted/>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)} 
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: '#FFFFFF' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* 👑 电脑端 Contact Us 双联系方式下拉按钮 */}
            <div className="relative hidden md:inline-block" ref={contactDropdownRef}>
              <button
                type="button"
                onClick={() => setNavContactOpen((v) => !v)}
                className="inline-flex items-center rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-300 hover:opacity-90"
                style={{ backgroundColor: CHAMPAGNE, color: INK }}
              >
                <span>Contact Us</span>
                <svg
                  className={cn("ml-1.5 size-3.5 transition-transform duration-200", navContactOpen ? "rotate-180" : "")}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {navContactOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-white/10 bg-[#1A1A1A] p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95">
                  <a
                    href={WHATSAPP_URL_1}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setNavContactOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#9e8f51]/20 text-[#9e8f51]">💬</span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold">WhatsApp Agent 1</span>
                      <span className="text-[10px] opacity-60">+60 10-326 8811</span>
                    </div>
                  </a>

                  <a
                    href={WHATSAPP_URL_2}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setNavContactOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#9e8f51]/20 text-[#9e8f51]">💬</span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold">WhatsApp Agent 2</span>
                      <span className="text-[10px] opacity-60">+60 16-276 6193</span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-8 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10 md:hidden"
              style={{ color: '#FFFFFF' }}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <div
        className={cn(
          'overflow-hidden border-b border-white/5 bg-black/80 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden',
          open ? 'max-h-[30rem] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                handleNavClick(e, link.href) 
                setOpen(false)               
              }}
              className="rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-white/10"
              style={{ color: '#FFFFFF' }}
            >
              {link.label}
            </a>
          ))}

          {/* 👑 移动端展示双 WhatsApp 按钮 */}
          <div className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-1">Contact Us via WhatsApp</p>
            <a
              href={WHATSAPP_URL_1}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold"
              style={{ backgroundColor: CHAMPAGNE, color: INK }}
            >
              <MessageCircle className="size-4" />
              WhatsApp Agent 1
            </a>
            <a
              href={WHATSAPP_URL_2}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold"
              style={{ backgroundColor: CHAMPAGNE, color: INK }}
            >
              <MessageCircle className="size-4" />
              WhatsApp Agent 2
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}