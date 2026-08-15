'use client'

import { useEffect, useState, useMemo } from 'react'
import { ArrowLeft, MapPin, MessageCircle, Layers, ImageIcon, X, Maximize2, Compass, Navigation, ChevronLeft, ChevronRight } from 'lucide-react'
import { getResidenceDetail } from '@/lib/residence-details'
import type { Residence } from '@/lib/residences'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { buildWhatsAppInquiryUrl, WHATSAPP_NUMBER_1, WHATSAPP_NUMBER_2 } from '@/lib/constants'

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

type MediaItem = {
  image: string
  label: string
}

export function ResidenceDetailPanel({
  residence,
  onClose,
  isClosing = false,
}: Props) {
  const [visible, setVisible] = useState(false)
  const detail = getResidenceDetail(residence.id)
  
  const cleanName = residence.name.endsWith('Residence') ? residence.name : `${residence.name} Residence`
  const title = `${cleanName.toUpperCase()}`
  const whatsAppUrl = buildWhatsAppInquiryUrl(residence.name)

  // 👑 核心功能 1：电影级线性媒体大阵列，抽取全屋所有图片按 UX 顺序平铺排列
  const mediaQueue = useMemo<MediaItem[]>(() => {
    const queue: MediaItem[] = []
    
    // 1. 默认大图 (Overview)
    queue.push({
      image: detail.heroImages?.[0] || residence.image || '/placeholder.svg',
      label: 'Overview'
    })

    // 2. 纵深扫描各个楼层下的所有可预览资源
    detail.floors.forEach((floor) => {
      // 压入该楼层的所有公共空间
      floor.commonAreas?.forEach((area) => {
        if (area.image) {
          queue.push({
            image: area.image,
            label: `${floor.label} - ${area.name}`
          })
        }
      })
      // 压入该楼层的所有独立房间
      floor.rooms?.forEach((room) => {
        if (room.image) {
          queue.push({
            image: room.image,
            label: `${floor.label} - ${room.name}`
          })
        }
      })
    })

    return queue
  }, [detail, residence])

  // 当前激活状态
  const [activeImage, setActiveImage] = useState<string>(mediaQueue[0]?.image || '/placeholder.svg')
  const [activeItemLabel, setActiveItemLabel] = useState<string>(mediaQueue[0]?.label || 'Overview')
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const currentIndex = useMemo(() => {
    const idx = mediaQueue.findIndex((item) => item.label === activeItemLabel)
    return idx === -1 ? 0 : idx
  }, [activeItemLabel, mediaQueue])

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation() 
    const prevIdx = (currentIndex - 1 + mediaQueue.length) % mediaQueue.length
    const prevItem = mediaQueue[prevIdx]
    if (prevItem) {
      setActiveImage(prevItem.image)
      setActiveItemLabel(prevItem.label)
    }
  }

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation() 
    const nextIdx = (currentIndex + 1) % mediaQueue.length
    const nextItem = mediaQueue[nextIdx]
    if (nextItem) {
      setActiveImage(nextItem.image)
      setActiveItemLabel(nextItem.label)
    }
  }

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
      } else if (e.key === 'ArrowLeft' && !isLightboxOpen) {
        const prevIdx = (currentIndex - 1 + mediaQueue.length) % mediaQueue.length
        const item = mediaQueue[prevIdx]
        if (item) { setActiveImage(item.image); setActiveItemLabel(item.label); }
      } else if (e.key === 'ArrowRight' && !isLightboxOpen) {
        const nextIdx = (currentIndex + 1) % mediaQueue.length
        const item = mediaQueue[nextIdx]
        if (item) { setActiveImage(item.image); setActiveItemLabel(item.label); }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, isLightboxOpen, currentIndex, mediaQueue])

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
      {/* 返回首页纽扣 */}
      <button
        type="button"
        onClick={onClose}
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-zinc-200/80 transition-all duration-300 hover:scale-105 active:scale-95 sm:left-6 sm:top-5"
        style={{ color: INK }}
      >
        <ArrowLeft className="size-3.5" />
        Return to Homepage
      </button>

      {/* 💻 左侧大舱：包含左右画廊翻页功能的超级视窗 */}
      <div 
        onClick={() => setIsLightboxOpen(true)}
        className="group/viewer w-full md:w-[45%] lg:w-[50%] h-[32vh] md:h-full relative bg-zinc-100 shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-zinc-200/60 cursor-zoom-in"
      >
        <Image 
          src={activeImage} 
          alt="Blur background" 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute inset-0 size-full object-cover blur-2xl scale-110 opacity-40 pointer-events-none select-none transition-all duration-700 ease-in-out" 
        />
        
        {/* 前景主体高清看房图 */}
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

        {/* 左边翻页箭扣舱 */}
        {mediaQueue.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 inline-flex size-9 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm text-white/80 border border-white/10 opacity-100 md:opacity-0 md:group-hover/viewer:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-black/40 hover:text-white active:scale-95 shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={handleNextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 inline-flex size-9 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm text-white/80 border border-white/10 opacity-100 md:opacity-0 md:group-hover/viewer:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-black/40 hover:text-white active:scale-95 shadow-md"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" strokeWidth={2.5} />
            </button>
          </>
        )}

        <div className="absolute top-4 right-4 z-20 hidden md:inline-flex size-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300">
          <Maximize2 className="size-3.5" />
        </div>
        
        {/* 当前图片资源索引指示器 */}
        <div className="absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 rounded bg-black/50 backdrop-blur-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white/90 border border-white/5 shadow-sm">
          <ImageIcon className="size-3 text-[#9e8f51]" />
          <span>Viewing: {activeItemLabel}</span>
          <span className="ml-1 px-1.5 py-0.5 rounded bg-white/10 text-white/60 text-[8px] font-mono tracking-normal">{currentIndex + 1}/{mediaQueue.length}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 pointer-events-none z-15" />
      </div>

      {/* 右侧大舱 */}
      <div className="flex-1 overflow-y-auto overscroll-contain transition-transform duration-500 ease-out px-4 py-6 md:p-12 pb-36 lg:pb-40">
        <div className="max-w-2xl mx-auto">
          {/* 顶层头部 */}
          <header className="pt-2">
            <h2 className="text-xl font-bold tracking-tight md:text-3xl text-[#1A1A1A] uppercase">
              {title}
            </h2>
            <div className="mt-2.5 flex flex-wrap gap-1">
              {detail.highlightTags.map((tag) => (
                <span key={tag} className="rounded-full px-2 py-0.5 text-[9px] font-medium border border-[#9e8f51]/40 bg-[#9e8f51]/10 text-[#9e8f51] uppercase tracking-wide">
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
                      <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                        {floor.label} {floor.tag && <span>({floor.tag})</span>}
                      </h4>
                      {floorGender && <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border bg-zinc-50 border-zinc-200 text-zinc-700">{floorGender}</span>}
                    </div>

                    {/* Shared Spaces 公共区域切换纽扣墙 */}
                    <div className="mb-5">
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-2">Shared Spaces · Click to preview</p>
                      <div className="flex flex-wrap gap-1.5">
                        {floor.commonAreas?.map((area) => {
                          const targetLabel = `${floor.label} - ${area.name}`
                          const isCurrent = activeItemLabel === targetLabel
                          return (
                            <button
                              key={`${floor.label}-${area.name}`}
                              type="button"
                              onClick={() => {
                                if (area.image) {
                                  setActiveImage(area.image)
                                  setActiveItemLabel(targetLabel)
                                }
                              }}
                              className={cn(
                                "inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-98 focus:outline-none",
                                isCurrent ? "border-[#9e8f51] bg-[#9e8f51]/10 text-[#1A1A1A] font-bold shadow-sm" : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                              )}
                            >
                              <Layers className={cn("size-3", isCurrent ? "text-[#9e8f51]" : "text-zinc-400")} />
                              {area.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* 房间列表纽扣墙 */}
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-2.5">{floor.label} ROOMS · Click to preview</p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {floor.rooms?.map((room, roomIdx) => {
                          const targetLabel = `${floor.label} - ${room.name}`
                          const isCurrentRoom = activeItemLabel === targetLabel
                          return (
                            <button
                              key={`${floor.label}-${room.name}-${roomIdx}`}
                              type="button"
                              onClick={() => {
                                if (room.image) {
                                  setActiveImage(room.image)
                                  setActiveItemLabel(targetLabel)
                                }
                              }}
                              className={cn(
                                "group/room flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-left transition-all duration-300 cursor-pointer w-full min-h-[48px] focus:outline-none",
                                isCurrentRoom ? "border-[#9e8f51] bg-white shadow-[0_6px_20px_rgba(197,168,128,0.12)] ring-2 ring-[#9e8f51]/15 z-10 font-bold" : "hover:border-zinc-300"
                              )}
                            >
                              <span className={cn("font-sans text-xs sm:text-sm font-semibold tracking-wide transition-colors truncate max-w-[85%]", isCurrentRoom ? "text-[#9e8f51] font-bold" : "text-[#1A1A1A]")}>
                                {room.name}
                              </span>
                              <ImageIcon className={cn("size-3.5 transition-all duration-300 shrink-0", isCurrentRoom ? "text-[#9e8f51] scale-105" : "text-zinc-300")} />
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
          {/* 🌟 极致重塑：360° 多场景全景漫游大舱 (全自动强制销毁强刷版) */}
          {/* ========================================================================= */}
          {detail.virtualTourUrl ? (() => {
            const tours = detail.virtualTourScenes && detail.virtualTourScenes.length > 0
              ? detail.virtualTourScenes.map(scene => ({
                  id: scene.id,
                  label: scene.label,
                  img: scene.image
                }))
              : [
                  { 
                    id: 'default', 
                    label: 'Overview', 
                    img: detail.virtualTourUrl 
                  }
                ];

            const [selectedTourIdx, setSelectedTourIdx] = useState(0);
            const safeIdx = selectedTourIdx >= tours.length ? 0 : selectedTourIdx;
            const currentTour = tours[safeIdx] || tours[0];

            // 计算安全的跨域解析路径，在 Next 开发和线上环境自适应
            const absolutePanoUrl = typeof window !== 'undefined' 
              ? window.location.origin + currentTour.img 
              : currentTour.img;

            return (
              <section className="mt-10 border-t border-zinc-200/60 pt-8">
                <div className="flex items-center justify-between gap-4 mb-2.5">
                  <h4 className="font-semibold text-sm font-bold tracking-wide uppercase text-[#1A1A1A]">
                    360° Immersive Virtual Tour
                  </h4>
                </div>
                
                <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
                  Explore multiple areas of {residence.name} in an interactive 360° panoramic chamber.
                </p>

                <div className="space-y-3">
                  {/* 1. 全景主视窗主战场 */}
                  <div className="overflow-hidden rounded-xl border border-zinc-200 aspect-[21/9] bg-zinc-900 shadow-sm relative">
                    <iframe 
                      key={currentTour.img}
                      src={`/pannellum/viewer.html?panorama=${currentTour.img}&autoLoad=true&hfov=120&minPitch=-120&maxPitch=120`}
                      className="size-full border-0 bg-zinc-900" 
                      allowFullScreen 
                    />
                    
                    {/* 左上角标示当前的房间区域 */}
                    <div className="absolute right-3 top-3 z-30 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/5 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      {currentTour.label}
                    </div>
                  </div>

                  {/* 2. 下方的动态缩略图滚动条 */}
                  <div className="w-full">
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Scenes Area · Click to switch view</p>
                    
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none overscroll-contain">
                      {tours.map((t, idx) => {
                        const isCurrent = safeIdx === idx;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTourIdx(idx)}
                            className={cn(
                              "relative flex-shrink-0 w-28 sm:w-32 aspect-[16/9] overflow-hidden rounded-md border text-left transition-all duration-300 focus:outline-none cursor-pointer",
                              isCurrent 
                                ? "border-2 border-[#1877F2] shadow-[0_4px_12px_rgba(24,119,242,0.2)] scale-[1.02] z-10" 
                                : "border-zinc-200 hover:border-zinc-400 opacity-70 hover:opacity-100"
                            )}
                          >
                            <img 
                              src={t.img} 
                              alt={t.label} 
                              className="size-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 pt-4">
                              <span className="block font-sans text-[8px] sm:text-[9px] font-black text-white truncate uppercase tracking-tight">
                                {t.label}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            );
          })() : (
            <section className="mt-10 border-t border-zinc-200/60 pt-8">
              <div className="flex items-center justify-between gap-4 mb-2.5">
                <h4 className="font-semibold text-sm font-bold tracking-wide uppercase text-[#1A1A1A]">
                  360° Immersive Virtual Tour
                </h4>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
                Explore multiple areas of {residence.name} in an interactive 360° panoramic chamber.
              </p>
              <div className="group relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-white/40 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:bg-white/80">
                <Compass className="size-5 text-[#9e8f51] transition-transform duration-700 group-hover:rotate-45" />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400 select-none">
                  [ Exterior 360° Panorama View Chamber ]
                </span>
              </div>
            </section>
          )}

          {/* 双源纯静态高奢导航舱 */}
          <section className="mt-12 border-t border-zinc-200/60 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold tracking-tight text-[#1A1A1A]">
                  Where is {residence.name}?
                </h3>
              </div>
            </div>
            
            {detail.googleMapsUrl ? (
              <a 
                href={detail.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden rounded-xl border border-[#1A1A1A]/[0.06] bg-[#EDECEA] aspect-[4/3] md:aspect-[16/10] w-full shadow-sm group/map animate-fade-in cursor-pointer"
              >
                {/* 手机端视窗 */}
                {detail.mapImageMobile ? (
                  <div className="block md:hidden relative size-full">
                    <Image src={detail.mapImageMobile} alt="Mobile map location" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover/map:scale-[1.02]" />
                  </div>
                ) : (
                  <div className="block md:hidden relative size-full">
                    <Image src={detail.mapImage} alt="Map location fallback" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover/map:scale-[1.02]" />
                  </div>
                )}

                {/* 电脑端视窗 */}
                <div className={cn("relative size-full", detail.mapImageMobile ? "hidden md:block" : "block")}>
                  <Image src={detail.mapImage} alt="Desktop map location" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover/map:scale-[1.01]" />
                </div>
                
                {/* 电脑端悬浮提示大胶囊 */}
                <div className="absolute inset-0 bg-black/0 group-hover/map:bg-black/[0.04] transition-colors duration-300 hidden md:flex items-center justify-center z-20">
                  <span className="inline-flex items-center gap-1.5 opacity-0 group-hover/map:opacity-100 transition-all duration-300 translate-y-1 group-hover/map:translate-y-0 bg-white/90 backdrop-blur-md text-[11px] font-bold px-3 py-1.5 rounded-full text-zinc-800 shadow-md border border-zinc-200/50 uppercase tracking-wider">
                    <Navigation className="size-3 fill-current text-[#9e8f51] rotate-45" />
                    Click to Open in Google Maps 
                  </span>
                </div>

                {/* 手机端专属胶囊 */}
                <div className="absolute bottom-3 right-3 z-30 flex md:hidden items-center gap-1.5 bg-[#9e8f51] text-[#1A1A1A] font-sans text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md active:scale-95 transition-transform">
                  <span>Click to Open in Google Maps</span>
                  <Navigation className="size-2.5 fill-current shrink-0 text-[#1A1A1A] rotate-45" />
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
                  <Image src={detail.mapImage} alt="Desktop map" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="absolute bottom-3 right-3 z-30 flex md:hidden items-center gap-1.5 bg-[#9e8f51] text-[#1A1A1A] font-sans text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md active:scale-95 transition-transform">
                  <span>Click to Open in Google Maps</span>
                  <Navigation className="size-2.5 fill-current shrink-0 text-[#1A1A1A] rotate-45" />
                </div>
              </div>
            )}
          </section>

        </div>
      </div>

      {/* 底部吸附固定咨询按钮舱 */}
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
        {/* 🎯 重构：双号码并排/叠加高奢按钮组 */}
        <div className="mx-auto flex max-w-lg flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
          
          {/* 📱 号码 1：高亮金色按钮 (如 Agent 1 / Line 1) */}
          <a
            href={buildWhatsAppInquiryUrl(residence.name, WHATSAPP_NUMBER_1)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-bold tracking-wide shadow-md transition-all duration-300 active:scale-[0.97] bg-[#9e8f51] text-[#1A1A1A] hover:opacity-90 whitespace-nowrap"
          >
            <svg className="size-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Our Team
          </a>

          {/* 📱 Agent 2 按钮 */}
          <a
            href={buildWhatsAppInquiryUrl(residence.name, WHATSAPP_NUMBER_2)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-bold tracking-wide shadow-md transition-all duration-300 active:scale-[0.97] bg-[#9e8f51] text-[#1A1A1A] hover:opacity-90 whitespace-nowrap"
          >
            <svg className="size-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Our Team
          </a>

        </div>
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
              <Image src={activeImage} alt={activeItemLabel} fill className="object-contain rounded-md shadow-2xl" onClick={(e) => e.stopPropagation()} />
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