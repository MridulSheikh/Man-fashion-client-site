import React from 'react'
import DahboardLayout from './DahboardLayout'
import PrductNavigation from './PrductNavigation'

function ProductLayout({children} : any) {
  return (
    <DahboardLayout>
        <PrductNavigation />
        <div>
            {children}
        </div>
    </DahboardLayout>
  )
}

export default ProductLayout