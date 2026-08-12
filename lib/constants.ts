// 👑 导出的两个联系号码
export const WHATSAPP_NUMBER_1 = '60103268811' // Agent 1
export const WHATSAPP_NUMBER_2 = '60162766193' // Agent 2 (换成你的第二个真实号码)

// 兼容旧代码，默认 WHATSAPP_NUMBER 指向第一个
export const WHATSAPP_NUMBER = WHATSAPP_NUMBER_1

export function buildWhatsAppInquiryUrl(residenceName: string, phoneNumber: string = WHATSAPP_NUMBER_1) {
  const label = `${residenceName.toUpperCase()}`
  const text = encodeURIComponent(
    `Hi! I came across the *${label}* on your website and would like to check if any rooms are currently available. Thank you!

*I want to stay*
Starting from : 
For how long : 

*Room preference*
Single / Double
Window / Skylight`
  )

  // 🎯 这里的 phoneNumber 是动态传入的
  return `https://wa.me/${phoneNumber}?text=${text}`
}