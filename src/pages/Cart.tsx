import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../components/Shared/Layout';
const img = require("../assets/img/empty_cart.jpg")

function Cart() {

  let total = 0;

  let item = JSON.parse(localStorage.getItem('cart') || '{}')
  item.map((itm: any) => {
    total = total + itm.price
  })

  const handleDeletion = (id: string) => {
    item = item.filter((item: any) => item.id != id)
    localStorage.setItem("cart", JSON.stringify(item))
    window.location.reload()
  }

  return (
    <Layout>
      <div>
        {
          item.length == 0 ?
            <div className='w-screen h-screen flex justify-center items-center'>
              <img src={img} alt="img" className='h-52' />
              <Link to="/shop">
                <button className='btn btn-sm font-sans'>get some item's</button>
              </Link>
            </div>
            :
            <div className='container mx-auto grid grid-cols-2 gap-10'>
              <div>
                {
                  item.map((i: any) => <div className='flex gap-4 mt-5 p-3 border rounded-md'>
                    <div className='w-20 h-20'>
                      <img src={i.img} alt="img" className='h-full' />
                    </div>
                    <div className="w-7/12">
                      <p className='font-sans font-semibold'>{i.name}</p>
                      <p className='font-normal text-2xl font-sans my-2'>${i.price}</p>
                      <p className='font-sans mb-2'>size : {i.size}</p>
                      <p className='font-sans'>quantity : {i.quantity}</p>
                      <button onClick={() => handleDeletion(i.id)} className='btn-sm btn btn-error font-sans mt-4'>remove</button>
                    </div>
                  </div>)
                }
              </div>
              <div>
                <div className='border rounded-md mt-5 p-5 fixed top-20 right-52 w-60 '>
                  <p className='font-sans'>Total : {total}</p>
                  <p className='font-sans'>Items : {item.length}</p>
                  <p className='font-sans'>Delivery : $15</p>
                  <p className='font-sans'>Pay : {total + 15}</p>
                  <Link to="/shipping">
                    <button className='btn btn-sm font-sans mt-3'>Procced to shipping</button>
                  </Link>
                </div>
              </div>
            </div>
        }
      </div>
    </Layout>
  )
}

export default Cart