'use client'

import { navResidences } from '@/lib/residences'

const CREAM = '#F9F9F7'
const INK = '#1A1A1A'
const WHATSAPP_URL_1 = 'https://wa.me/60103268811' // Agent 1
const WHATSAPP_URL_2 = 'https://wa.me/60162766193' // 🎯 换成你的第 2 个 WhatsApp 手机号
const FACEBOOK_URL = 'https://www.facebook.com/sibu.theroomresidence/'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSmoothScrollAndHighlight = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const cardElement = document.getElementById(targetId)
    
    if (cardElement) {
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })

      setTimeout(() => {
        cardElement.classList.add(
          'scale-[1.04]',
          'shadow-[0_25px_60px_rgba(197,168,128,0.35)]',
          'ring-4',
          'ring-[#9e8f51]/20',
          'border-[#9e8f51]',
          'z-10'
        )
      }, 400)

      setTimeout(() => {
        cardElement.classList.remove(
          'scale-[1.04]',
          'shadow-[0_25px_60px_rgba(197,168,128,0.35)]',
          'ring-4',
          'ring-[#9e8f51]/20',
          'border-[#9e8f51]',
          'z-10'
        )
      }, 2400)
    }
  }

  return (
    <footer
      id="contact"
      className="border-t border-zinc-200"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-5 items-start">
          
          <div className="col-span-2 sm:col-span-3 md:col-span-1 flex items-start justify-start">
            <button 
              onClick={scrollToTop}
              className="transition-transform duration-300 hover:scale-102 active:scale-98 focus:outline-none block group text-left"
              aria-label="Scroll to top"
            >
              <img 
                src="/images/The Room Residence Logo.png" 
                alt="The Room Residence Logo" 
                className="h-28 sm:h-32 md:h-36 lg:h-40 w-auto object-contain object-left brightness-[0.98] contrast-[1.02]"
              />
            </button>
          </div>

          {/* Residences */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: `${INK}66` }}>
              Residences
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navResidences.map((r) => (
                <li key={r.id}>
                  <a
                    href={`#${r.id}`}
                    onClick={(e) => handleSmoothScrollAndHighlight(e, r.id)}
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: `${INK}A6` }}
                  >
                    {r.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: `${INK}66` }}>
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'About Us', href: 'about', isExternal: false },
                { label: 'Residences', href: 'residences', isExternal: false },
                { label: 'Community Guidelines', href: '/community-guidelines', isExternal: true },
                { label: 'FAQs', href: 'faqs', isExternal: false },
                { label: 'Contact', href: 'contact', isExternal: false },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.isExternal ? l.href : `#${l.href}`}
                    onClick={(e) => {
                      if (!l.isExternal) {
                        handleSmoothScrollAndHighlight(e, l.href)
                      }
                    }}
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: `${INK}A6` }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner With Us */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: `${INK}66` }}>
              Partner With Us
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                'Join Us as Agent',
                'Property Management',
                'Landlord Collaboration',
                'Business Enquiry',
              ].map((partnerLabel, idx) => (
                <li key={idx}>
                  <a
                    href={`${WHATSAPP_URL_1}?text=Hi, I am interested in ${encodeURIComponent(partnerLabel)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-opacity hover:opacity-70 block"
                    style={{ color: `${INK}A6` }}
                  >
                    {partnerLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 👑 Connect 三大私域（支持双 WhatsApp 账号） */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: `${INK}66` }}>
              Connect
            </h3>
            <div className="flex items-center gap-3">
                {/* 🟢 WhatsApp 1 */}
                <a
                  href={WHATSAPP_URL_1}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp Agent 1"
                  className="relative inline-flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-all duration-300 hover:bg-zinc-50 hover:text-[#25D366] hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon className="size-5 fill-current" />
                  {/* 右上角数字角标 */}
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#9e8f51] text-[9px] font-black text-white shadow-xs">
                    1
                  </span>
                </a>

                {/* 🟢 WhatsApp 2 */}
                <a
                  href={WHATSAPP_URL_2}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp Agent 2"
                  className="relative inline-flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-all duration-300 hover:bg-zinc-50 hover:text-[#25D366] hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon className="size-5 fill-current" />
                  {/* 右上角数字角标 */}
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#9e8f51] text-[9px] font-black text-white shadow-xs">
                    2
                  </span>
                </a>

              {/* 🔵 Facebook 按钮 */}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-all duration-300 hover:bg-zinc-50 hover:text-[#1877F2] hover:scale-105 hover:shadow-md active:scale-95"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-zinc-200 pt-6 text-xs sm:flex-row"
          style={{ color: `${INK}73` }}
        >
          <p>The Room Residence, by Multiplex Property</p>
          <p className="tracking-wide font-medium">Sibu, Sarawak · Malaysia</p>
        </div>
      </div>
    </footer>
  )
}