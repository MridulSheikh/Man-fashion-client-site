import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlayerTrackNext } from 'react-icons/tb';
import { RotatingLines } from 'react-loader-spinner';
import DahboardLayout from '../components/dashboard/DahboardLayout';
import ShopCard from '../components/Shop/ShopCard';
import useAuth from '../hooks/useAuth';

function ManageProduct() {

  const [catagoray, setCatagoray] = useState<string>("all");
  const [product, setProduct] = useState<any[]>([])
  const { isLoading, setIsLoading } = useAuth()
  const [page, setPage] = useState(1)
  const [length, setLength] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    axios.get(`http://localhost:5000/api/v1/product?page=${page}`)
      .then(function (response) {
        setLength(response.data.Length)
        setProduct(response.data.body)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setIsLoading(false))
  }, [page])

  const handlePaginate = (value: number) => {
    if (value == 1) {
      if (page < Math.ceil(length / 20)) {
        setPage(page + 1)
      }
      else {
        setPage(1)
      }
    }
    else if (value == 0) {
      if (page > 1) {
        setPage(page - 1)
      }
      else {
        setPage(Math.ceil(length / 20))
      }
    }
  }

  return (
    <DahboardLayout>
      <div className='flex px-16 py-5 sticky top-0 justify-between shadow-md z-40 bg-white '>
        <div>
          <div className="form-control">
            <div className="input-group">
              <input type="text" placeholder="Search by title, name" className="input input-bordered" />
              <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>
        </div>
        <div className='flex items-center '>
          <div className='mr-7'>
            <div className="dropdown">
              <label tabIndex={0} className="btn m-1">{catagoray}</label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li onClick={() => setCatagoray("jines")} ><a>Jines</a></li>
                <li onClick={() => setCatagoray("shirt")} ><a>Shirt</a></li>
                <li onClick={() => setCatagoray("t-shirt")} ><a>T-Shirt</a></li>
                <li onClick={() => setCatagoray("shoies")} ><a>shoies</a></li>
                <li onClick={() => setCatagoray("watches")} ><a>watches</a></li>
                <li onClick={() => setCatagoray("all")} ><a>All</a></li>
              </ul>
            </div>
          </div>
          <button className='text-2xl btn rounded-md'><AiOutlinePlus /></button>
        </div>
      </div>

      <div>
        {
          isLoading ?
            <div className=' py-48 flex justify-center items-center '>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="35"
                visible={true}
              />
            </div>
            :
            <div className='px-5'>
              <div className='px-5'>
                {
                  product.map(pr => <div className='grid grid-cols-5 gap-2 text-center shadow-sm rounded-md p-4 my-5 border'>
                    <div>
                      <p>{pr.productName.substring(0,17)}....</p>
                    </div>
                   <div className="w-5">
                        <img src={pr.productImg} alt="profile img" />
                    </div>
                    <div className="w-5">
                       <p className='text-sm'>{pr.productVarient}</p>
                    </div>
                    <div className="w-5">
                       <p className='text-sm'>${pr.productPrice}</p>
                    </div>
                    <div>
                      <button className='btn btn-sm btn-primary'>Edit</button>
                      <button className='btn btn-sm btn-secondary mx-3'>Delete</button>
                    </div>
                  </div>)
                }
              </div>
              <div className='mt-10 flex justify-center'>
                <div className='flex gap-5'>
                  <button onClick={() => handlePaginate(0)} className='btn btn-sm font-sans'><TbPlayerTrackNext className=' rotate-180 ' /></button>
                  <p className='font-sans text-xl text-gray-400'>{page}/{Math.ceil(length / 20)}</p>
                  <button onClick={() => handlePaginate(1)} className='btn btn-sm font-sans'><TbPlayerTrackNext /></button>
                </div>
              </div>
            </div>
        }
      </div>
    </DahboardLayout>
  )
}

export default ManageProduct