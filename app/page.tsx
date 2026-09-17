import dynamic from 'next/dynamic'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Residences } from '@/components/residences'

const Testimonials = dynamic(() => import('@/components/testimonials').then((mod) => mod.Testimonials))
const About = dynamic(() => import('@/components/about').then((mod) => mod.About))
const Faq = dynamic(() => import('@/components/faq').then((mod) => mod.Faq))
const Footer = dynamic(() => import('@/components/footer').then((mod) => mod.Footer))

export default function Page() {
  return (
    <main className="min-h-screen scroll-smooth" style={{ backgroundColor: '#F9F9F7' }}>
      <Navbar />
      <Hero />
      <Residences />
      <Testimonials />
      <About />
      <Faq />
      <Footer />
    </main>
  )
}
