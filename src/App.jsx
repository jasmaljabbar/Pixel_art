import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Featuresection from './components/Featuresection'
import WorkFlow from './components/WorkFlow'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Contact from './components/Contact'
import MosaicMaker from './components/MosaicMaker'


const App = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <Featuresection />
        <WorkFlow />
        <MosaicMaker />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
