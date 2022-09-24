import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Blocks, RotatingLines } from 'react-loader-spinner';
import { useParams } from 'react-router-dom'
import Layout from '../components/Shared/Layout';
import useCart from '../hooks/useCart';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>({});
  const [quantity, setQuantit] = useState<number>(1);
  const [size, setSize] = useState<string>("L");
  const { addtodatabase } = useCart();
  let total = product.productPrice * quantity;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/product/findone?id=${id}`)
      .then(function (response) {
        // handle success
        console.log(response)
        setProduct(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])

  const handleQuantity = (value: number) => {
    if (value === 1) {
      if (quantity < 10) {
        setQuantit(quantity + 1)
        total = product.productPrice * quantity;
      }
    }
    else if (value === 0) {
      if (quantity > 1) {
        setQuantit(quantity - 1)
        total = product.productPrice * quantity;
      }
    }
  }


  return (
    <Layout>
      <div className='container mx-auto mt-5'>
        {
          !product.productName ?
            <div className=' py-48 w-screen flex justify-center items-center '>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="35"
                visible={true}
              />
            </div>
            :
            <div className='grid grid-cols-3 gap-5'>
              <div className='flex justify-center items-center '>
                <div className='h-96 overflow-hidden '>
                  <img src={product.productImg} alt="img" className='h-full w-full' />
                </div>
              </div>
              <div className=''>
                <h1 className='font-sans font-semibold text-2xl'>{product.productName}</h1>
                <div className='mt-7'>
                  <h1 className='font-sans font-bold'>About this item</h1>
                  <ol className=' list-disc mt-3 ml-4'>
                    {
                      product.productDetails.map((details: string) => <li className='font-sans'>{details}</li>)
                    }
                  </ol>
                </div>
              </div>
              <div>
                <div className='border rounded-md ml-5 p-5'>
                  <h1 className='text-3xl font-sans'> <sup>$</sup>{product.productPrice}</h1>
                  <p className='mt-3 font-sans font-semibold text-gray-500'>{product.productVarient}</p>
                  <h1 className='font-sans mb-3 mt-6 ont-semibold text-gray-500 text-xl'>size</h1>
                  {
                    product.productSize.map((size: string) => <button onClick={() => setSize(size)} className='btn btn-outline btn-sm font-sans mr-3'>{size}</button>)
                  }
                  <h1 className='font-sans mb-3 mt-6 ont-semibold text-gray-500 text-xl'>Quantity</h1>
                  <div className='flex justify-start'>
                    <div className='flex gap-1'>
                      <button onClick={() => handleQuantity(0)} className='btn btn-sm font-sans'>-</button>
                      <p className='font-sans text-xl text-gray-400  border rounded-md px-3'>{quantity}</p>
                      <button onClick={() => handleQuantity(1)} className='btn btn-sm font-sans'>+</button>
                    </div>
                  </div>

                  <div className='my-7 flex justify-between '>
                    <p className='font-sans'>size : {size}</p>
                    <p className='font-sans'>quantity : {quantity}</p>
                    <p className='font-sans'>Total : ${total}</p>
                  </div>
                  <button onClick={() => addtodatabase(id, quantity, total, size, product.productImg, product.productName)} className='btn btn-primary btn-sm font-sans'> Add to cart</button>
                </div>
              </div>
            </div>
        }
      </div>
    </Layout>
  )
}

export default Product