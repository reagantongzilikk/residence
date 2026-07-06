import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Logo({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <a
      href="#home"
      className={cn('group flex items-center gap-2.5', className)}
      aria-label="The Room Residence — home"
    >
      {/* 👑 容器舱：彻底移除 bg-white / bg-white/10，任何时候都保持暗色 */}
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-md border p-1 transition-all duration-300',
          // 无论 inverted 是真是假，都只在 hover 时让边框和背景染上淡淡的香槟金，绝不变白
          'border-white/20 bg-white/5 group-hover:bg-[#9e8f51]/10 group-hover:border-[#9e8f51]',
        )}
        aria-hidden="true"
      >
        <Image
          src="/The Room Residence Logo.png"
          alt="The Room Residence Logo"
          width={22}
          height={22}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      
      {/* 文字舱 */}
      <span className="flex flex-col leading-none">
        {/* 👑 标题：干掉 text-foreground / text-black，100% 锁死纯白 */}
        <span className="text-[15px] font-semibold tracking-tight text-white">
          The Room Residence
        </span>
        
        {/* 👑 SIBU：缩紧、微调间距、100% 锁死香槟金 */}
        <span
          className="text-[10px] font-black uppercase tracking-[0.05em] mt-0.5"
          style={{ color: '#9e8f51' }}
        >
          SIBU
        </span>
      </span>
    </a>
  )
}