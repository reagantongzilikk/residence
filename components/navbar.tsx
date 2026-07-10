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

  // 🎬 丝滑滚动导演拦截函数（你的发动机）
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault() // 👈 原理点：阻止默认跳跃行为
      const targetId = href.replace('#', '') 
      
      // 如果点击的是 home，直接调用原生窗口平滑回顶机制
      if (targetId === 'home') {
        const element = document.getElementById('home')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          // 🌟 核心原理解法：无视锚点，命令浏览器大窗口平滑回顶
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

  // 👑 改动 3：新增 useEffect 核心引擎，监听滚动方向来控制收回与滑出
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
    // 👑 改动 4：在 header 加上 transition-transform 和 Y 轴位移控制，实现智能收缩
    <header

        className={cn(

        "fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-in-out",

        isVisible ? "translate-y-0" : "-translate-y-full"

        )}

        >  
      {/* 👑 改动 5：增强磨砂底色，把 bg-black/20 调深成 bg-[#1A1A1A]/80，防止手机上看过于死黑笨重 */}
      <div className="h-full w-full border-b border-white/5 bg-[#1A1A1A]/80 backdrop-blur-md">
        
        {/* 👑 改动 6【极限瘦身】：把原先的 h-16 (手机) 和 md:h-20 (桌面2K) 狠狠砍碎！ */}
        {/* 统一缩紧成：手机端固定 h-12（极其精致超窄），桌面 2K 端缩减到 md:h-14，全平台瞬间变细！ */}
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-5 md:h-14 md:px-8">
          
          {/* 🌟 核心改动点：用 <a> 标签把 Logo 打包起来，并接上发动机！ */}
          {/* 加上了 hover:scale-102 active:scale-98，点击时 Logo 会有非常精致的微弱机械下压感回馈 */}
          <a 
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="transition-transform duration-300 hover:scale-102 active:scale-98 block focus:outline-none"
            aria-label="Scroll to top"
          >
            <Logo inverted/>
          </a>

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