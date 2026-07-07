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
        <h1 className="w-full flex flex-col items-center justify-center text-center leading-none">
          
          {/* 👑 第一行：SIBU ROOM RENTAL */}
          {/* text-4xl sm:text-5xl md:text-6xl 保留你无敌的粗体字号 */}
          {/* tracking-[0.22em]：这个值是精准针对 5 个圆形 Logo 的总宽度计算出来的字间距大招！ */}
          {/* text-center 确保文字锚定在中轴线绝对居中 */}
          <span className="w-full text-center text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-[0.10em] pr-[0.22em]">
            SIBU ROOM RENTAL
          </span>

          {/* ========================================================= */}
          {/* 👑 第二行：FULLY FURNISHED ACCOMMODATION */}
          {/* ========================================================= */}
          {/* 缩短间距：用 tracking-[0.06em] 让它整体收窄一点，正好比上面的主标题窄一圈，形成完美的视觉梯形层级 */}
          <span 
            className="mt-5 block w-full text-center text-xl sm:text-2xl md:text-3xl opacity-90 font-bebas text-zinc-300 tracking-[0.06em] pr-[0.06em]"
          >
            FULLY FURNISHED ACCOMMODATION
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-white/70">
          Transforming Rooms into Residences 
          <br />
          Over 100 exclusive rooms
        </p>

        {/* 🌟 核心改动：全面解绑交互，化身为极致纯粹的奢华图章墙 */}
        <div className="mt-12 w-full overflow-hidden">
          {/* 📐 顶级大屏适配阵列：
              - 手机端：`size-24`（紧凑不爆屏）
              - iPad/平板：`sm:size-28 md:size-36`
              - 普通电脑：`lg:size-40`（160px）
              - 2K/大屏：`xl:size-44`（176px）
              - 4K/高端巨幕：`2xl:size-48`（192px）
              
              🌟 这样改完，无论分辨率多大，圆盘都会按比例一起变大，里面的金色衬线字在任何巨幕上都绝对清晰、锐利！ */}
          <div className="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto px-2 overflow-x-auto scrollbar-none">
            {navResidences.map((r) => {
              const logoImgSrc = RESIDENCE_LOGOS[r.id] || '/placeholder.svg'

              return (
                <div
                  key={r.id}
                  className="relative flex items-center justify-center rounded-full border-0 overflow-hidden shrink-0 shadow-lg size-14 sm:size-16 md:size-24 lg:size-28 xl:size-32"                >
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
          <ArrowDown className="size-4 animate-bounce text-[#9e8f51]" />
        </a>
      </div>
    </section>
  )
}