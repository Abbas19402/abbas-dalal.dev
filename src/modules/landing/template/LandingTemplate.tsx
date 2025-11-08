'use client'
import Hero from '../components/Hero';
import Skills from '../components/Skills';

const LandingTemplate = () => {
  return (
    <div className="flex flex-col h-full justify-center items-center">
        <Hero />
        <Skills />
    </div>
  )
}

export default LandingTemplate
