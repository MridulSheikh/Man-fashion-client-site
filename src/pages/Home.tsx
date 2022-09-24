import React from 'react'
import Banner from '../components/Home/Banner'
import Contact from '../components/Home/Contact'
import OurBest from '../components/Home/OurBest'
import Testimonial from '../components/Home/Testimonial'
import Layout from '../components/Shared/Layout'

function Home() {
  return (
    <Layout>
      <div>
        <Banner />
        <OurBest />
        <Testimonial />
        <Contact />
      </div>
    </Layout>
  )
}

export default Home