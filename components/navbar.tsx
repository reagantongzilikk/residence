'use client'

import { useEffect, useState, useRef } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER_1, WHATSAPP_NUMBER_2 } from '@/lib/constants'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const INK = '#FFFFFF'
const CHAMPAGNE = '#9e8f51'

const WHATSAPP_URL_1 = `https://wa.me/${WHATSAPP_NUMBER_1}`
const WHATSAPP_URL_2 = `https://wa.me/${WHATSAPP_NUMBER_2}`

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
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#9e8f51]/20 text-[#9e8f51]">
                      <svg
                        className="size-4 fill-[#25D366] -translate-y-[0.5px] translate-x-[0.5px]"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold">WhatsApp Our Team</span>
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
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#9e8f51]/20 text-[#9e8f51]">
                      <svg
                        className="size-4 fill-[#25D366] -translate-y-[0.5px] translate-x-[0.5px]"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="font-bold">WhatsApp Our Team</span>
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
              WhatsApp Our Team
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
              WhatsApp Our Team
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}