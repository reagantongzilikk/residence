'use client'

import Image from 'next/image'

const stats = [
  { value: '2021', label: 'Founded in Sibu' },
  { value: '5', label: 'Residences' },
  { value: '100+', label: 'Fully Furnished Rooms' },
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-28" style={{ backgroundColor: '#F9F9F7' }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        
        {/* 左侧文字与数据舱 */}
        <div className="flex flex-col justify-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#9e8f51' }}>
            About Us
          </span>
          <h2 className="mt-3 text-balance text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight " style={{ color: '#1A1A1A' }}>
            TRANSFORMING ROOMS INTO RESIDENCES SINCE 2021
          </h2>
          <div className="mt-6 space-y-4 text-pretty leading-relaxed max-w-xl" style={{ color: '#1A1A1AA6' }}>
            <p>
              What began as 3 rooms in 2021 has grown into over 100 fully furnished residences across Sibu. 
              We started The Room Residence to give students and young professionals a better way to live.
            </p>
            <p>
              Our mission is simple: "Transforming Rooms into Residences."
            </p>
            <p>
              That means clean, comfortable, well-managed spaces where you feel safe, settled, and at home - from day one.
            </p>
          </div>

          {/* 精准微调数据舱：文字段落不跟着动，只有这 3 个数字和说明标签在手机端做居中对齐 */}
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-zinc-200 pt-8 text-center md:text-left">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center md:items-start">
                <dt className="text-2xl sm:text-3xl font-semibold md:text-4xl" style={{ color: '#1A1A1A' }}>
                  {s.value}
                </dt>
                <dd className="mt-1 text-[11px] sm:text-xs leading-snug opacity-80" style={{ color: '#1A1A1A66' }}>
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {/* 右侧图片舱 */}
        <div className="flex justify-center md:justify-start items-start gap-4 pt-4 pb-4 md:pb-0 w-full">
          
          {/* 海报 1 */}
          <div className="relative w-[45%] md:w-1/2 aspect-[3/4]">
            <Image
              src="/images/TRR Poster xxx.png"
              alt="Cozy furnished living corner with armchair"
              fill
              sizes="(max-width: 768px) 45vw, 25vw"
              className="rounded-3xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform duration-500 hover:md:-translate-y-1 block select-none pointer-events-none"
            />
          </div>

          {/* 海报 2 */}
          <div className="relative w-[45%] md:w-1/2 aspect-[3/4] mt-12">
            <Image
              src="/images/TRR Poster.png"
              alt="About Us Poster 2"
              fill
              sizes="(max-width: 768px) 45vw, 25vw"
              className="rounded-3xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform duration-500 hover:md:translate-y-1 block select-none pointer-events-none"
            />
          </div>
          
        </div>
      </div>
    </section>
  )
}