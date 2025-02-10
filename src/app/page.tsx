// app/page.tsx
import Hero from '@/components/Hero'
import WhoWeAre from '@/components/WhoWeAre'
import FeaturedCategories from '@/components/FeaturedCategories'
import Services from '@/components/Services'
import Support from '@/components/Support'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoWeAre />
      <FeaturedCategories />
      <Services />
      <Support />
    </main>
  )
}