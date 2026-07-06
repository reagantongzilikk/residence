'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, MapPin, MessageCircle, Layers, ImageIcon, X, Maximize2, Compass, Navigation } from 'lucide-react'
import { buildWhatsAppInquiryUrl } from '@/lib/constants'
import { getResidenceDetail } from '@/lib/residence-details'
import type { Residence } from '@/lib/residences'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const WARM_CREAM = '#F9F9F7'
const INK = '#1A1A1A'
const CHAMPAGNE = '#9e8f51'

type AmenityKey =
  | 'propertyType'
  | 'propertyLayout'
  | 'roomType'
  | 'occupancyType'
  | 'bathroomFacilities'
  | 'sharedAmenities'
  | 'deposit'
  | 'utilities'

const AMENITY_LABELS: Record<AmenityKey, string> = {
  propertyType: 'PROPERTY TYPE',
  propertyLayout: 'PROPERTY LAYOUT',
  roomType: 'ROOM TYPE',
  sharedAmenities: 'SHARED AMENITIES',
  bathroomFacilities: 'BATHROOM FACILITIES',
  occupancyType: 'OCCUPANCY TYPE',
  deposit: 'DEPOSIT',
  utilities: 'UTILITIES',
}

type Props = {
  residence: Residence
  onClose: () => void
  isClosing?: boolean
}

export function ResidenceDetailPanel({
  residence,
  onClose,
  isClosing = false,
}: Props) {
  const [visible, setVisible] = useState(false)
  const detail = getResidenceDetail(residence.id)
  const title = `${residence.name.toUpperCase()} RESIDENCE`
  const whatsAppUrl = buildWhatsAppInquiryUrl(residence.name)
  
  // 左侧大视窗当前显示的媒体大图
  const [activeImage, setActiveImage] = useState<string>(
    detail.heroImages?.[0] || residence.image || '/placeholder.svg'
  )
  const [activeItemLabel, setActiveItemLabel] = useState<string>('Overview')
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (isClosing) setVisible(false)
  }, [isClosing])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) setIsLightboxOpen(false)
        else onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, isLightboxOpen])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col md:flex-row transition-opacity duration-500 ease-out md:overflow-hidden',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{ backgroundColor: WARM_CREAM }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} details`}
    >
      {/* 👑 返回首页纽扣（满血回归！） */}
      <button
        type="button"
        onClick={onClose}
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-zinc-200/80 transition-all duration-300 hover:scale-105 active:scale-95 sm:left-6 sm:top-5"
        style={{ color: INK }}
      >
        <ArrowLeft className="size-3.5" />
        Return to Homepage
      </button>

      {/* 💻 左侧大舱：电影级媒体大视窗（Next.js 极速内核，脱落 key 属性彻底清除黑闪） */}
      <div 
        onClick={() => setIsLightboxOpen(true)}
        className="group/viewer w-full md:w-[45%] lg:w-[50%] h-[32vh] md:h-full relative bg-zinc-100 shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-zinc-200/60 cursor-zoom-in"
      >
        {/* 背景超大模糊光晕 */}
        <Image 
          src={activeImage} 
          alt="Blur background" 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute inset-0 size-full object-cover blur-2xl scale-110 opacity-40 pointer-events-none select-none transition-all duration-700 ease-in-out" 
        />
        
        {/* 前景主体高清看房图：加入 priority 强制首屏瞬间秒开 */}
        <div className="relative size-full transition-transform duration-500 group-hover/viewer:scale-[1.01]">
          <Image 
            src={activeImage} 
            alt={activeItemLabel} 
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-3 md:p-6" 
          />
        </div>

        <div className="absolute top-4 right-4 z-20 hidden md:inline-flex size-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300">
          <Maximize2 className="size-3.5" />
        </div>
        <div className="absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 rounded bg-black/50 backdrop-blur-md px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white/90 border border-white/5">
          <ImageIcon className="size-3 text-[#C5A880]" />
          Viewing: {activeItemLabel}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 pointer-events-none z-15" />
      </div>

      {/* 右侧大舱 */}
      <div className="flex-1 overflow-y-auto overscroll-contain transition-transform duration-500 ease-out px-4 py-6 md:p-12 pb-36 lg:pb-40">
        <div className="max-w-2xl mx-auto">
          {/* 顶层头部 */}
          <header className="pt-2">
            <h2 className="text-xl font-bold tracking-tight md:text-3xl font-bebas text-[#1A1A1A] uppercase">
              {title}
            </h2>
            <div className="mt-2.5 flex flex-wrap gap-1">
              {detail.highlightTags.map((tag) => (
                <span key={tag} className="rounded-full px-2 py-0.5 text-[9px] font-medium border border-[#C5A880]/40 bg-[#C5A880]/10 text-[#C5A880] uppercase tracking-wide">
                  {tag}
                </span>
              ))}
              {detail.audienceTags.map((tag) => (
                <span key={tag} className="rounded-full bg-[#1A1A1A]/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#1A1A1A]/60">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3.5 text-xs md:text-sm leading-relaxed text-[#1A1A1A]/70">{residence.tagline}</p>
            <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-[#1A1A1A]/50">
              <MapPin className="size-3 text-[#1A1A1A]" />
              {residence.location}
            </p>
          </header>

          {/* Specs 八宫格规格版 */}
          <section className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#1A1A1A]/[0.06] bg-[#1A1A1A]/[0.05]">
              {(Object.keys(AMENITY_LABELS) as AmenityKey[]).map((key) => {
                const items = (detail.amenityGrid as any)?.[key] || [];
                return (
                  <div key={key} className="px-4 py-3.5 md:px-6 md:py-5" style={{ backgroundColor: WARM_CREAM }}>
                    <h3 className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A]/40">{AMENITY_LABELS[key]}</h3>
                    <ul className="mt-1.5 space-y-0.5">
                      {items.map((item: string) => (
                        <li key={item} className="text-xs text-[#1A1A1A]/85 leading-relaxed font-semibold tracking-wide">{item}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 楼层层级交互 */}
          {detail.floors.length > 0 && (
            <section className="mt-10 space-y-10">
              {detail.floors.map((floor) => {
                const floorGender: string | undefined = (floor as any).gender;
                return (
                  <div key={floor.label} className="border-t border-zinc-200/60 pt-8 first:border-t-0 first:pt-0">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h4 className="font-bebas text-sm font-bold tracking-wide uppercase text-[#1A1A1A]">
                        {floor.label}
                      </h4>
                      {floorGender && <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border bg-zinc-50 border-zinc-200 text-zinc-700">{floorGender}</span>}
                    </div>

                    {/* Shared Spaces 公共核心切换纽扣 */}
                    <div className="mb-5">
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-2">Shared Spaces · Click to preview</p>
                      <div className="flex flex-wrap gap-1.5">
                        {floor.commonAreas?.map((area) => {
                          const isCurrent = activeItemLabel === `${floor.label} - ${area.name}`
                          return (
                            <button
                              key={`${floor.label}-${area.name}`}
                              type="button"
                              onClick={() => {
                                if (area.image) {
                                  setActiveImage(area.image)
                                  setActiveItemLabel(`${floor.label} - ${area.name}`)
                                }
                              }}
                              className={cn(
                                "inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-98 focus:outline-none",
                                isCurrent ? "border-[#C5A880] bg-[#C5A880]/10 text-[#1A1A1A] font-bold shadow-sm" : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                              )}
                            >
                              <Layers className={cn("size-3", isCurrent ? "text-[#C5A880]" : "text-zinc-400")} />
                              {area.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* 房间列表 */}
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-2.5">{floor.label} ROOMS · Click to preview</p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {floor.rooms?.map((room, roomIdx) => {
                          const isCurrentRoom = activeItemLabel === `${floor.label} - ${room.name}`
                          return (
                            <button
                              key={`${floor.label}-${room.name}-${roomIdx}`}
                              type="button"
                              onClick={() => {
                                if (room.image) {
                                  setActiveImage(room.image)
                                  setActiveItemLabel(`${floor.label} - ${room.name}`)
                                }
                              }}
                              className={cn(
                                "group/room flex items-center justify-between rounded-xl border px-3.5 py-3 text-left transition-all duration-300 cursor-pointer w-full min-h-[48px] focus:outline-none",
                                isCurrentRoom ? "border-[#C5A880] bg-white shadow-[0_6px_20px_rgba(197,168,128,0.12)] ring-2 ring-[#C5A880]/15 z-10" : "border-zinc-200 bg-white hover:border-zinc-300"
                              )}
                            >
                              <span className={cn("font-sans text-xs sm:text-sm font-semibold tracking-wide transition-colors truncate max-w-[85%]", isCurrentRoom ? "text-[#C5A880]" : "text-[#1A1A1A]")}>
                                {room.name}
                              </span>
                              <ImageIcon className={cn("size-3.5 transition-all duration-300 shrink-0", isCurrentRoom ? "text-[#C5A880] scale-105" : "text-zinc-300")} />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </section>
          )}

          {/* ========================================================================= */}
          {/* 🌟 极致重塑 1：360° 外部全景环境漫游大舱 */}
          {/* ========================================================================= */}
          <section className="mt-10 border-t border-zinc-200/60 pt-8">
            <div className="flex items-center justify-between gap-4 mb-2.5">
              <h4 className="font-bebas text-sm font-bold tracking-wide uppercase text-[#1A1A1A]">
                360° Exterior Virtual Tour
              </h4>
              {!detail.virtualTourUrl && (
                <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/20">
                  Coming Soon
                </span>
              )}
            </div>
            
            <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
              An immersive 360° exterior surrounding tour of the {residence.name} neighborhood environment will be integrated below.
            </p>
            
            {detail.virtualTourUrl ? (
              <div className="overflow-hidden rounded-xl border border-zinc-200 aspect-[21/9]">
                <iframe src={detail.virtualTourUrl} className="size-full border-0" allowFullScreen />
              </div>
            ) : (
              <div className="group relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-white/40 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-white/80">
                <Compass className="size-5 text-[#C5A880] transition-transform duration-700 group-hover:rotate-45" />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400 select-none">
                  [ Exterior 360° Panorama View Chamber ]
                </span>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* 🌟 极致净化：双源纯静态高奢导航舱（纯 CSS 零崩溃切换，手机自动适配饱满 4:3 比例） */}
          {/* ========================================================================= */}
          <section className="mt-12 border-t border-zinc-200/60 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold tracking-tight text-[#1A1A1A]">
                  Where is {residence.name} Residence?
                </h3>
              </div>
              
              {detail.googleMapsUrl && (
                <a
                  href={detail.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C5A880] hover:opacity-80 transition-opacity shrink-0"
                >
                  <Navigation className="size-3.5 fill-current" />
                  Open in Google Maps →
                </a>
              )}
            </div>
            
            {/* 🗺️ 地图主战场 */}
            {detail.googleMapsUrl ? (
              <a 
                href={detail.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden rounded-xl border border-[#1A1A1A]/[0.06] bg-[#EDECEA] aspect-[4/3] md:aspect-[16/10] w-full shadow-sm group/map animate-fade-in cursor-pointer"
              >
                {/* 📱 手机端视窗：超大字号局部放大图 mapImageMobile */}
                {detail.mapImageMobile ? (
                  <div className="block md:hidden relative size-full">
                    <Image 
                      src={detail.mapImageMobile} 
                      alt="Mobile map location" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover/map:scale-[1.02]" 
                    />
                  </div>
                ) : (
                  <div className="block md:hidden relative size-full">
                    <Image 
                      src={detail.mapImage} 
                      alt="Map location fallback" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover/map:scale-[1.02]" 
                    />
                  </div>
                )}

                {/* 💻 电脑端视窗 */}
                <div className={cn("relative size-full", detail.mapImageMobile ? "hidden md:block" : "block")}>
                  <Image 
                    src={detail.mapImage} 
                    alt="Desktop map location" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover/map:scale-[1.01]" 
                  />
                </div>
                
                {/* 💻 电脑端专属：鼠标悬浮时浮现的微黑高光蒙层提示 */}
                <div className="absolute inset-0 bg-black/0 group-hover/map:bg-black/[0.04] transition-colors duration-300 hidden md:flex items-center justify-center z-20">
                  <span className="opacity-0 group-hover/map:opacity-100 transition-all duration-300 translate-y-1 group-hover/map:translate-y-0 bg-white/90 backdrop-blur-md text-[11px] font-bold px-3 py-1.5 rounded-full text-zinc-800 shadow-md border border-zinc-200/50 uppercase tracking-wider">
                    Click to Open in Google Maps ↗
                  </span>
                </div>

                {/* 📱 手机端专属：常驻在右下角的高奢香槟金“点击导航”小胶囊（完美解决手机无 hover 问题） */}
                <div className="absolute bottom-3 right-3 z-30 block md:hidden bg-[#C5A880] text-[#1A1A1A] font-sans text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full shadow-md active:scale-95 transition-transform">
                  Click to Open in Google Maps ↗
                </div>
              </a>
            ) : (
              <div className="relative overflow-hidden rounded-xl border border-[#1A1A1A]/[0.06] bg-[#EDECEA] aspect-[4/3] md:aspect-[16/10] w-full shadow-sm">
                {detail.mapImageMobile && (
                  <div className="block md:hidden relative size-full">
                    <Image src={detail.mapImageMobile} alt="Mobile map" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                )}
                <div className={cn("relative size-full", detail.mapImageMobile ? "hidden md:block" : "block")}>
                  <Image 
                    src={detail.mapImage} 
                    alt="Desktop map" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover" 
                  />
                </div>
              </div>
            )}
          </section>

        </div>
      </div>

      {/* 底部吸附固定看房舱 */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-[60] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 transition-all duration-500 ease-out sm:px-6 md:absolute md:right-0 md:left-auto md:w-[55%] lg:w-[50%]',
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
        style={{
          backgroundColor: WARM_CREAM,
          boxShadow: '0 -12px 30px -5px rgba(249, 249, 247, 0.95)',
          borderTop: '1px solid rgba(26, 26, 26, 0.04)'
        }}
      >
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold tracking-wide shadow-md transition-transform duration-300 active:scale-[0.97] bg-[#C5A880] text-[#1A1A1A] whitespace-nowrap"
        >
          <MessageCircle className="size-4 shrink-0" />
          Whatsapp to Check Availability
        </a>
      </div>

      {/* 灯箱全屏大舱 */}
      {isLightboxOpen && (
        <div onClick={() => setIsLightboxOpen(false)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-zoom-out animate-fade-in">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsLightboxOpen(false)
            }}
            className="absolute top-4 right-4 z-[110] inline-flex size-10 items-center justify-center rounded-full bg-white/10 border border-white/10 text-white/80"
          >
            <X className="size-5" />
          </button>

          <div className="w-full h-full max-w-[95vw] max-h-[90vh] flex flex-col items-center justify-center p-2">
            <div className="relative w-full h-full max-w-full max-h-full select-none pointer-events-none">
              <Image 
                src={activeImage} 
                alt={activeItemLabel} 
                fill 
                className="object-contain rounded-md shadow-2xl" 
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
            <p className="mt-3 text-xs font-medium tracking-widest text-white/40 uppercase">
              {residence.name.toUpperCase()} RESIDENCE // {activeItemLabel}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}