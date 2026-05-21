'use client'

import { useContributeModal } from '@/hooks/useContributeModal'
import { Navbar } from '@/components/shared/Navbar'
import { MobileCtaBar } from '@/components/shared/MobileCtaBar'
import { ContributeModal } from '@/components/contribute/ContributeModal'
import { MemoryMap } from '@/components/map/MemoryMap'

export default function MapPage() {
  const { isOpen, open, close } = useContributeModal()

  return (
    <>
      <Navbar onContributeClick={open} />
      <MobileCtaBar onClick={open} />

      <main className="pt-[68px] pb-14 md:pb-0 h-screen overflow-hidden">
        <MemoryMap />
      </main>

      <ContributeModal isOpen={isOpen} onClose={close} />
    </>
  )
}
