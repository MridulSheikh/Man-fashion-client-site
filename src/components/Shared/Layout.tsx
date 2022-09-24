import React from 'react'
import Footer from './Footer'
import Navigation from './Navigation'

function Layout({children} : any) {
  return (
    <div>
        <Navigation />
        <div>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout