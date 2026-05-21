'use client'

import { useRouter } from 'next/navigation'
import { useContributeModal } from '@/hooks/useContributeModal'
import { Navbar } from '@/components/shared/Navbar'
import { MobileCtaBar } from '@/components/shared/MobileCtaBar'
import { Footer } from '@/components/shared/Footer'
import { ContributeModal } from '@/components/contribute/ContributeModal'
import { Hero } from '@/components/home/Hero'
import { AboutSection } from '@/components/home/AboutSection'
import { ProjectInfo } from '@/components/home/ProjectInfo'
import { VerifySection } from '@/components/home/VerifySection'
import { FeaturesTeaser } from '@/components/home/FeaturesTeaser'
import { CtaBanner } from '@/components/home/CtaBanner'

export default function HomePage() {
  const router = useRouter()
  const { isOpen, open, close } = useContributeModal()

  return (
    <>
      <Navbar onContributeClick={open} />
      <MobileCtaBar onClick={open} />

      <main className="pb-14 md:pb-0">
        <Hero onExplore={() => router.push('/library')} onContribute={open} />
        <AboutSection />
        <ProjectInfo />
        <VerifySection />
        <FeaturesTeaser onContribute={open} />
        <CtaBanner onContribute={open} />
      </main>

      <Footer onContributeClick={open} />
      <ContributeModal isOpen={isOpen} onClose={close} />
    </>
  )
}
