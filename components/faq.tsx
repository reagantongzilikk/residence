'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'How do I book a room?',
    a: 'You can book a room by contacting us directly or through our trusted agents. To confirm your booking, a deposit and 1 month advance rental is required. \n\nOnce payment is received, we’ll prepare your tenancy agreement and schedule your move-in date.',
  },
  {
    q: 'What are the deposit and rental fees?',
    a: 'Deposit is typically 1.5 or 2 months, depending on the residence. \n\n Rental fees vary based on room size, type, and amenities provided. Please refer to the residence details or check with our agents for the latest rates.',
  },
  {
    q: 'What’s the minimum stay?',
    a: 'Our standard tenancy period is 12 months. We may consider shorter stays on a case-by-case basis if you have a valid reason. Approval is subject to room availability and management discretion.',
  },
  {
    q: 'Can I view the room before booking?',
    a: 'Yes, you’re welcome to view the room if it’s vacant at the time of your visit. If the room is currently occupied, we’ll provide you with photos and videos instead. Just contact us or our agents to arrange a viewing or request media — we’re happy to help.',
  },
  {
    q: 'Can I move in anytime?',
    a: 'You can move in any day if the room is vacant. All contracts officially start on the 1st of each month. \n\n• Move in 1st–15th: Pay full month. Contract starts this month. \n\n• Move in after 15th: Pay half month + contract starts next month, OR pay full month to start immediately.',
  },
  {
    q: 'Is Wi-Fi provided?',
    a: 'Yes. We provide free Wi-Fi for all tenants, and the cost is covered by us.',
  },
  {
    q: 'Does the room have aircon and fan?',
    a: 'All our rooms come with an air conditioner and do not include ceiling fan. For details on aircon electricity billing, please refer to "How is room electricity calculated?" in the FAQs',
  },
  {
    q: 'How is room electricity calculated?',
    a: 'Every room comes with an individual sub-meter. You only pay for your room’s usage based on SESCO rates. Common area electricity is on us.',
  },
  {
    q: 'What happens if I want to terminate early?',
    a: 'We follow the tenancy agreement strictly. The deposit will not be refunded for early termination. \n\nYou may request to find a replacement tenant for the exact duration of your contract. Approval is subject to management’s final decision, and the new tenant must move in immediately with no gap.',
  },
  
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faqs" className="py-20 md:py-28 border-t border-b border-zinc-200/40" style={{ backgroundColor: '#F3F3F0' }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#9e8f51' }}>
            Good to know
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase text-[#1A1A1A]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-sm md:text-base" style={{ color: '#1A1A1AA6' }}>
            Everything you need to know about renting with The Room Residence.
            Still have a question?{' '}
            <a
              href={'https://wa.me/60103268811'}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline decoration-black/15 underline-offset-4 hover:decoration-black/30 transition-colors"
              style={{ color: '#1A1A1A' }}
            >
              Talk to our team
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className={cn(
                  'overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.015)]',
                  isOpen && 'shadow-[0_12px_30px_rgba(0,0,0,0.02)] border-zinc-300/80',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-zinc-50/50"
                >
                  <span className="text-base font-semibold tracking-tight" style={{ color: '#1A1A1A' }}>
                    {item.q}
                  </span>
                  <Plus
                    className={cn(
                      'size-5 shrink-0 transition-   duration-300',
                      isOpen && 'rotate-45 text-[#9e8f51]', // 展开时加号旋转，顺便变成淡金色提示
                    )}
                    style={{ color: isOpen ? '#9e8f51' : '#1A1A1A50' }}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300 ease-out',
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-zinc-600">
                      {item.a.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < item.a.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}