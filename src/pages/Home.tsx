import React from 'react'
import Banner from '../components/Home/Banner'
import Contact from '../components/Home/Contact'
import OurBest from '../components/Home/OurBest'
import Testimonial from '../components/Home/Testimonial'

function Home() {
  return (
    <div>
        <Banner />
        <OurBest />
        <Testimonial />
        <Contact />
    </div>
  )
}

export default Home