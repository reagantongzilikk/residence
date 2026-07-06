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
          <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl" style={{ color: '#1A1A1A' }}>
            TRANSFORMING ROOMS INTO RESIDENCES SINCE 2021
          </h2>
          <div className="mt-6 space-y-4 text-pretty leading-relaxed" style={{ color: '#1A1A1AA6' }}>
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

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-3xl font-semibold md:text-4xl" style={{ color: '#1A1A1A' }}>
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug" style={{ color: '#1A1A1A66' }}>
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 📱 右侧图片舱：极致绝对对称 + 黄金错落舱 */}
        {/* 🌟 核心魔法：用 justify-center 让整组海报在手机端绝对居中！md:justify-start 适配电脑端端正布局 */}
        <div className="flex justify-center md:justify-start items-start gap-4 pt-4 pb-24 w-full">
          
          {/* 海报 1：手机端宽度用 w-[45%] 腾出两侧完美对称的留白，大屏 md:w-1/2 */}
          <img
            src="/images/TRR Poster xxx.png"
            alt="Cozy furnished living corner with armchair"
            className="w-[45%] md:w-1/2 h-auto rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform duration-500 hover:md:-translate-y-1 block select-none pointer-events-none"
          />

          {/* 海报 2：手机端完美保留 mt-12 错落，利用绝对居中消灭歪斜感 */}
          <img
            src="/images/TRR Poster.png"
            alt="About Us Poster 2"
            className="w-[45%] md:w-1/2 h-auto rounded-3xl mt-12 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-transform duration-500 hover:md:translate-y-1 block select-none pointer-events-none"
          />
          
        </div>
      </div>
    </section>
  )
}