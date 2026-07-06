'use client'

import { ArrowDown } from 'lucide-react'
import { navResidences } from '@/lib/residences'

// 🌟 精准映射老哥上传的 5 张官方高奢 Logo 图片路径
const RESIDENCE_LOGOS: Record<string, string> = {
  parkway: '/residence_logo/Parkway Residence Logo.png',
  kingsway: '/residence_logo/Kingsway Residence Logo.png',
  norway: '/residence_logo/Norway Residence Logo.png',
  steinway: '/residence_logo/Steinway Residence Logo.png',
  velway: '/residence_logo/Velway Residence Logo.png',
}

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-black text-white">
      {/* 背景大片层 */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/Norway Residence - Main Entrance.webp"
          alt=""
          aria-hidden="true"
          className="size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 pb-16 pt-32 text-center md:px-8 md:pb-24 md:pt-44">
    
        {/* 杂志风主标题 */}
        <h1 className="mt-7 max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl font-serif">
          Sibu Room Rental
          <span className="mt-2 block text-xl font-light sm:text-2xl md:text-3xl opacity-90 font-serif">
            Fully Furnished Accommodation
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-white/70">
          Transforming Rooms into Residences 
          <br />
          Over 100 exclusive rooms
        </p>

        {/* 🌟 核心改动：全面解绑交互，化身为极致纯粹的奢华图章墙 */}
        <div className="mt-12 w-full">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A880]/80">
            OUR LUXURY COLLECTION
          </p>

          {/* 📐 顶级大屏适配阵列：
              - 手机端：`size-24`（紧凑不爆屏）
              - iPad/平板：`sm:size-28 md:size-36`
              - 普通电脑：`lg:size-40`（160px）
              - 2K/大屏：`xl:size-44`（176px）
              - 4K/高端巨幕：`2xl:size-48`（192px）
              
              🌟 这样改完，无论分辨率多大，圆盘都会按比例一起变大，里面的金色衬线字在任何巨幕上都绝对清晰、锐利！ */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
            {navResidences.map((r) => {
              const logoImgSrc = RESIDENCE_LOGOS[r.id] || '/placeholder.svg'

              return (
                <div
                  key={r.id}
                  className="relative flex items-center justify-center rounded-full border border-white/15 overflow-hidden bg-zinc-950 shadow-md transition-all duration-300 size-24 sm:size-28 md:size-36 lg:size-40 xl:size-44 2xl:size-48"
                >
                  <img
                    src={logoImgSrc}
                    alt={`${r.name} Logo`}
                    className="size-full object-cover"
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* 极简下滚提示：这个保留，方便用户戳一下丝滑下滚去看房源卡片 */}
        <a
          href="#residences"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('residences')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="mt-14 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] transition-opacity hover:opacity-70 cursor-pointer text-white/70"
        >
          Discover residences
          <ArrowDown className="size-4 animate-bounce text-[#C5A880]" />
        </a>
      </div>
    </section>
  )
}