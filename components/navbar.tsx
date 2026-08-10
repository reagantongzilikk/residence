'use client'

// 👑 改动 1：引入 useState 和 useEffect 监听滚动
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const INK = '#FFFFFF'
const CHAMPAGNE = '#9e8f51'
const whatsAppUrl = 'https://wa.me/60103268811' 

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Residences', href: '#residences' },
  { label: 'FAQs', href: '#faqs' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  
  // 👑 改动 2：新增控制显示隐藏的状态变量
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault() // 阻止默认跳跃行为
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

  useEffect(() => {
    const handleScroll = () => {
      // 移动端菜单如果是打开的状态，禁止收回导航栏
      if (open) return

      const currentScrollY = window.scrollY
      
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false) // 往下滚 -> 收回去
      } else {
        setIsVisible(true)  // 往上滚 -> 弹出来
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
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
            <a
              href={whatsAppUrl}
              
              target="_blank"
              rel="noopener noreferrer"
              
              className="hidden items-center rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-300 hover:opacity-90 md:inline-flex"
              style={{ backgroundColor: '#9e8f51', color: INK }}
            >
              Contact Us
            </a>
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
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
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
          <a
            href="#contact"
            onClick={(e) => {
              handleNavClick(e, '#contact')
              setOpen(false)
            }}
            className="mt-2 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
            style={{ backgroundColor: CHAMPAGNE, color: INK }}
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  )
}