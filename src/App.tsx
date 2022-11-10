import React from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import Team from './components/Team'
import Footer from './components/Footer'
import FadeInWhenVisible from './components/FadeInWhenVisible'
import BackToTop from './components/BackToTop'

type Props = {}

function App({}: Props) {
  return (
    <div>
      <BackToTop />
      <Hero />
      <FadeInWhenVisible>
        <Features />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <Team />
        <Footer />
      </FadeInWhenVisible>
    </div>
  )
}

export default App