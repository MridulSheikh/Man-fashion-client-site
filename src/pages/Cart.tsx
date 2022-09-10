import React from 'react'

function Cart() {
  
  const item = JSON.parse(localStorage.getItem('cart') || '{}')
  console.log(item)

  return (
    <div className='container mx-auto'>
        {
            item.map((i : any) => <p className='font-sans'>{i.id}</p>)
        }
    </div>
  )
}

export default Cart