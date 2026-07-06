'use client'

import React from 'react'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const CHAMPAGNE = '#9e8f51'
const INK = '#1A1A1A'

const guidelines = [
  {
    num: '1',
    title: 'RENT & BILLS — KEEP IT SIMPLE',
    content: 'Rent due 1st–5th each month via bank transfer. Send us the slip. \n\n Late payments: \n\n• Day 6-9: We’ll WhatsApp reminder + electricity auto off until paid. RM150 reactivation fee if meter tampered. \n• Day 10+: Room may be re-rented. We’ll store your items 7 days for collection. \n\nWhy the strict policy? Your rent keeps The Room Residence running. On-time payment lets us keep standards high for everyone. \n\nDeposits ≠ Rent. Deposit returned 10 days after move-out inspection.'
  },
  {
    num: '2',
    title: 'RESPECT YOUR ROOMIES',
    content: 'Quiet hours: 11pm–7am. Use headphones, keep calls low. Your housemate has 8am exam.\n\nNo disrespect to anyone — housemates, neighbours, or us — in person or group chat. 3 strikes = termination.\n\nVisitors: Day visits 9am–10pm only. Register with us first. No overnight guests. Overnight = extra person = RM100/night charge.\n\nMale/female units: If you’re in single-gender unit, opposite gender not allowed inside. Immediate termination if breached. Safety first.'
  },
  {
    num: '3',
    title: 'SECURITY — DON’T SHARE ACCESS',
    content: '1 key + 1 access token per tenant only. Lost key/token: RM100 replacement. Locked yourself out: RM50, RM100 after 5pm/weekends.\n\nNever share gate code/face ID. RM200 penalty if leaked. We have logs.\n\nCCTV in common areas for safety only. No, you can’t request footage. PDRM only.'
  },
  {
    num: '4',
    title: 'YOUR ROOM, YOUR RESPONSIBILITY',
    content: 'Keep it as you found it: Aircon, bed, desk, clothes rack, curtains etc. Normal wear & tear = fine. Holes in wall, broken chair = you repair/replace.\n\nRoom check: We’ll WhatsApp 24h before scheduled maintenance or monthly check.\n\nMove-out:\n\n1. Give 3 months notice to extend, 1 month to leave\n2. Clean room, take video, put key on hook behind door\n3. We inspect → deposit back in 14 days\n\nDirty room = cleaning fee deducted. Wall Policy: Do not stick, tape, or mount anything on walls, ceilings, windows or doors.'
  },
  {
    num: '5',
    title: 'COMMON AREAS — SAMA-SAMA JAGA',
    content: 'Kitchen: Wash your plates immediately. No cooking in rooms — fire hazard + ants + RM300 cleaning fee.\n\nRubbish: Throw out every 2 days. Don’t use housemate’s bag. Green bins behind shop lot.\n\nLaundry: Don’t leave clothes for hours. Ask in group before removing others’. No washing shoes — breaks machine = RM300.\n\nFridge: Biweekly clear your expired food. We’re not your mum.\n\nDamage: You break it, you pay for it. Same as at home.'
  },
  {
    num: '6',
    title: 'UTILITIES — DON’T WASTE, DON’T ABUSE',
    content: 'Water & WiFi included. Don’t leave tap running or torrent 24/7. Be reasonable.\n\nAircon: Each room has submeter. You pay what you use.\n\nHigh-power items: Want to bring mini fridge/rice cooker? WhatsApp us first for approval. No approval = RM100/month surcharge.'
  },
  {
    num: '7',
    title: 'SAFETY & COMMON SENSE',
    content: 'Max 1-2 persons per room as agreed. Sneak in extra person = 1 month rent penalty.\n\nNo illegal stuff: Drugs, gambling, pets. Police case = immediate termination, no deposit.\n\nNo smoking/vaping indoors. Ever. RM100 penalty. Smoke outside gate only.\n\nParcels: At your own risk. We don’t sign for you or keep it safe.\n\nDisputes: We’re not family court. If your issue affects house safety/reputation, we may terminate.'
  },
  {
    num: '8',
    title: 'WE CAN UPDATE THIS',
    content: 'Laws change, Sesco rates change, we adjust. We’ll give 14 days notice in group chat. Continued stay = you agree.'
  }
]

export default function CommunityGuidelinesPage() {
  return (
    // 全局大底色保持与老站一致的极简高端暗黑基调
    <main className="min-h-screen bg-[#111111] text-white pt-16 md:pt-20 selection:bg-[#9e8f51]/30">
      
      {/* 🌟 战区一：电影感 Hero 顶区 */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* 背景大图 */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/P2Kitchen.jpeg" 
            alt="Guidelines Cover" 
            className="w-full h-full object-cover opacity-30 brightness-75 scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/50" />
        </div>

        {/* 顶部文字内容 */}
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-6 opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: CHAMPAGNE }}
          >
            <ArrowLeft className="size-3.5" /> Back to Home
          </Link>

          {/* 👑 核心修复：彻底拿掉 text-balance，锁定单行，配合精准的响应式字号梯队 */}
          {/* 手机端为 text-xl / sm 屏为 text-3xl / 2K 或大屏为 lg:text-6xl，带极细字距，确保在任何手机里都稳稳躺在一排不溢出 */}
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase whitespace-nowrap">
            Your Guide to Happy Living
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-pretty text-xs md:text-sm leading-relaxed text-zinc-400">
            We’re home to 100+ students & young professionals across Sibu. These guidelines help everyone study, work, rest, and stay safe together.
          </p>
        </div>
      </section>

      {/* 🌟 战区二：极度干练、不拖泥带水的 8 大暗黑守则面板 */}
      <section className="py-20 max-w-3xl mx-auto px-5 md:px-8">
        <div className="space-y-14">
          {guidelines.map((g) => (
            <div 
              key={g.num} 
              className="group border-l-2 border-zinc-800 hover:border-[#9e8f51] pl-6 transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <span 
                  className="text-xs font-black tracking-wider px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800"
                  style={{ color: CHAMPAGNE }}
                >
                  {g.num.padStart(2, '0')}
                </span>
                <h2 className="text-base font-bold tracking-wider uppercase text-zinc-100 group-hover:text-white transition-colors">
                  {g.title}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors tracking-wide whitespace-pre-line">
                {g.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🌟 战区三：复刻老站的香槟金底部转化舱 */}
      <section className="py-20 border-t border-white/5" style={{ backgroundColor: '#9e8f51' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 items-center md:grid-cols-2 lg:gap-16">
            
            {/* 左侧金底黑字转化文本 */}
            <div className="text-[#1A1A1A]">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl uppercase">
                Ready to join our community?
              </h2>
              <p className="mt-4 text-sm leading-relaxed opacity-80 max-w-md">
                Limited rooms are available. Join 100+ students & young professionals across Sibu. All-in rooms from RM400 with Wi-Fi, cleaning, and 24/7 support.
              </p>
              <div className="mt-8">
                <Link
                  href="/#residences"
                  className="inline-flex items-center justify-center rounded-full bg-[#1A1A1A] text-white px-7 py-3 text-sm font-semibold shadow-lg transition-transform hover:scale-105 active:scale-98"
                >
                  View All Residences
                </Link>
              </div>
            </div>

            {/* 右侧高端房间开窗图 */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl border border-white/10">
              <img 
                src="/images/K1Room.png" 
                alt="Beautiful room layout" 
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}