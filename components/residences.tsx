'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Check, MapPin } from 'lucide-react'
import { ResidenceDetailPanel } from '@/components/residence-detail-panel'
import { residences, type Residence } from '@/lib/residences'
import { cn } from '@/lib/utils'

export function Residences() {
  const [activeResidence, setActiveResidence] = useState<Residence | null>(
    null,
  )
  const [closing, setClosing] = useState(false)

  const handleOpen = useCallback((residence: Residence) => {
    setClosing(false)
    setActiveResidence(residence)
  }, [])

  const handleClose = useCallback(() => {
    setClosing(true)
    window.setTimeout(() => {
      setActiveResidence(null)
      setClosing(false)
    }, 400)
  }, [])

  useEffect(() => {
    if (activeResidence) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeResidence])

  return (
    <>
      <section
        id="residences"
        className="pt-8 pb-20 md:py-28"
        style={{ backgroundColor: '#F9F9F7' }}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-xl">
            <span
              className="text-[11px] font-medium uppercase tracking-[0.25em]"
              style={{ color: '#1A1A1A66' }}
            >
            </span>
            <h2
              className="mt-3 font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl uppercase whitespace-nowrap"
              style={{ color: '#1A1A1A' }}
            >
              DISCOVER OUR RESIDENCES
            </h2>
            <p
              className="mt-2 text-balance text-[12px] sm:text-xs leading-relaxed opacity-70"
              style={{ color: '#1A1A1AA6' }}
            >
              Tap any card to explore amenities and location
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-6">
              {residences.map((r) => (
                <article
                  key={r.id}
                  id={r.id}
                  role={r.comingSoon ? undefined : "button"}
                  tabIndex={r.comingSoon ? undefined : 0}
                  onClick={() => {
                    if (r.comingSoon) return
                    handleOpen(r)
                  }}
                  onKeyDown={(e) => {
                    if (!r.comingSoon && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      handleOpen(r)
                    }
                  }}
                  className={cn(
                    "group flex flex-col scroll-mt-32 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-500 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10",
                    "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0",
                    r.comingSoon
                      ? "cursor-default opacity-95"
                      : "cursor-pointer hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)]"
                  )}
                >
                <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                  <Image
                    src={r.image || '/placeholder.svg'}
                    alt={`${r.name} exterior`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out",
                      !r.comingSoon && "group-hover:scale-105"
                    )}
                  />

                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/90">
                    <MapPin className="size-3.5" style={{ color: '#9e8f51' }} />
                    {r.location}
                  </span>
                </div>

                <div className="flex flex-col gap-4 p-6 flex-1">
                  <div>
                    <h3 
                      className={cn(
                        "text-xl font-semibold tracking-tight transition-opacity",
                        !r.comingSoon && "group-hover:opacity-80"
                      )} 
                      style={{ color: '#1A1A1A' }}
                    >
                      {r.name}
                    </h3>
                      
                    {r.tagline && (
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: '#1A1A1A99' }}>
                        {r.tagline}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {r.facilities.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium"
                        style={{ backgroundColor: '#F3F4F6', color: '#1A1A1A' }}
                      >
                        <Check className="size-3 text-zinc-500" />
                        {f}
                      </span>
                    ))}
                  </div>

                  <p
                    className="text-[11px] mt-auto pt-4 font-medium uppercase tracking-[0.2em] transition-opacity group-hover:opacity-70"
                    style={{ color: '#1A1A1A66' }}
                  >
                    {r.comingSoon ? 'Stay Tuned // 敬请期待' : 'Tap to explore →'}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeResidence && (
        <ResidenceDetailPanel
          residence={activeResidence}
          onClose={handleClose}
          isClosing={closing}
        />
      )}
    </>
  )
}