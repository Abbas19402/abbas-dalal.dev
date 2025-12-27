'use client'
import Hero from '../components/Hero';
import Showcase from '../components/Showcase';
import About from '../components/About';
import Skills from '../components/Skills';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const LandingTemplate = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Showcase />
      <About />
      <Skills />
      <Testimonials />
      <Contact />
    </div>
  )
}

export default LandingTemplate


