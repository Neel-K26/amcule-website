import { useLenis } from './hooks/useLenis'
import { Nav } from './components/sections/Nav'
import { Hero } from './components/sections/Hero'
import { TrustTicker } from './components/sections/TrustTicker'
import { WhatWeDo } from './components/sections/WhatWeDo'
import { Architecture } from './components/sections/Architecture'
import { Objectives } from './components/sections/Objectives'
import { OilGas } from './components/sections/OilGas'
import { Platform } from './components/sections/Platform'
import { Validation } from './components/sections/Validation'
import { Moat } from './components/sections/Moat'
import { Mission } from './components/sections/Mission'
import { Team } from './components/sections/Team'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/sections/Footer'

function App() {
  useLenis()

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <TrustTicker />
        <WhatWeDo />
        <Architecture />
        <Objectives />
        <OilGas />
        <Platform />
        <Validation />
        <Moat />
        <Mission />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
