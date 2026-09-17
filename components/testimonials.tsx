'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

type Review = {
  name: string
  handle: string
  rating: number
  text: string
  image: string
}

const reviews: Review[] = [
  {
    name: 'Evelyn Hung',
    handle: 'Facebook Review, Jan 2026',
    rating: 5,
    text: 'Best choice for uni student nice environment and facilities and location is convenient and near uni too.',
    image:'/images/tenants/evelynhung.jpeg',
  },
  {
    name: '安迪烈',
    handle: 'Facebook Review, Jan 2026',
    rating: 5,
    text: 'Very clean, comfortable and not gonna lie this place creates and gives me memories. Recommend for all !',
    image:'/images/tenants/andre.jpeg',
  },
  {
    name: 'Shirly Ivin Wong',
    handle: 'Facebook Review, Dec 2025',
    rating: 5,
    text: 'strategic location, near UTS, a lot of food shops around, responsible and friendly management, really recommend it !',
    image:'/images/tenants/shirley.jpeg',
  },
  {
    name: 'Zem Ahnaf',
    handle: 'Facebook Review, Sep 2025',
    rating: 5,
    text: 'So comfortable and clean. Highly recommended Dekat sangat dengan UTS, dah setahun saya stay sini.',
    image:'/images/tenants/zanif.jpeg',
  },
  {
    name: '徐婷婷',
    handle: 'Facebook Review, Sep 2023',
    rating: 5,
    text: 'Super clean and comfortable, it has everything you need. A great location with various commercial facilities.',
    image:'/images/tenants/tingting.jpeg',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)

  const next = useCallback(
    () => setIndex((i) => (i + 1) % reviews.length),
    [],
  )
  const prev = () =>
    setIndex((i) => (i - 1 + reviews.length) % reviews.length)

  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [next])

  const review = reviews[index]

  return (
    <section 
      className="pt-8 pb-16 md:py-28 border-t border-b border-zinc-200/40" 
      style={{ backgroundColor: '#F3F3F0' }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* 纯白极简浮雕卡 */}
        <div className="relative mt-12 rounded-3xl border border-zinc-200/60 bg-white p-8 shadow-[0_16px_40px_rgba(0,0,0,0.02)] md:p-12 text-center">
          
          <Quote
            className="mx-auto size-8 opacity-25"
            style={{ color: '#9e8f51' }}
            aria-hidden="true"
          />


          {/* 文本外层 */}
          <div className="mt-6 min-h-[112px] sm:min-h-[72px] flex items-center justify-center">
            <blockquote className="mx-auto text-balance text-base font-medium leading-relaxed md:text-lg text-zinc-800 transition-all duration-300">
              &ldquo;{review.text}&rdquo;
            </blockquote>
          </div>

          <div
            className="mt-5 flex items-center justify-center gap-1"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-4"
                style={{
                  fill: i < review.rating ? '#9e8f51' : 'none',
                  color: i < review.rating ? '#9e8f51' : '#1A1A1A15'
                }}
              />
            ))}
          </div>

          {/* 租客个人名片信息 */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="relative size-10 shrink-0">
              <Image
                src={review.image}
                alt={`${review.name}'s avatar`}
                fill
                className="rounded-full object-cover"
              />
            </div>


            <div className="text-left">
              <p className="text-sm font-bold text-[#1A1A1A]">
                {review.name}
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">{review.handle}</p>
            </div>
          </div>
        </div>

        {/* 下方的左右翻页按钮 */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous review"
            className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white shadow-sm text-[#1A1A1A] transition-all hover:bg-zinc-50 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={
                  i === index
                    ? 'h-1.5 w-5 rounded-full transition-all duration-300'
                    : 'size-1.5 rounded-full transition-all duration-300 hover:bg-zinc-400 cursor-pointer'
                }
                style={{ backgroundColor: i === index ? '#1A1A1A' : 'rgba(26, 26, 26, 0.15)' }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next review"
            className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white shadow-sm text-[#1A1A1A] transition-all hover:bg-zinc-50 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}