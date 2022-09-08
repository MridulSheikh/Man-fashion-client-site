import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Blocks, Radio } from 'react-loader-spinner'
import ShopCard from '../components/Shop/ShopCard'
import useAuth from '../hooks/useAuth'
import ReactPaginate from 'react-paginate';

function Shop() {
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

     const handlePaginate = (value : number) =>{
           if(value == 1){
             if(page < Math.ceil(length/20)){
                setPage(page+1)
             }
             else{
                setPage(1)
             }
           }
           else if(value == 0){
            if(page > 1){
                setPage(page-1)
            }
            else{
                setPage(Math.ceil(length/20))
            }
           }
     }
     
    return (
        <div>
            {
                isLoading ?
                    <div className=' py-48 w-screen flex justify-center items-center '>
                        <Radio
                            visible={true}
                            height="80"
                            width="80"
                            colors={['#8C5E58', '#2B061E', '#361134']}
                            ariaLabel="radio-loading"
                            wrapperStyle={{}}
                            wrapperClass="radio-wrapper"
                        />
                    </div>
                    :
                    <div>
                        <div className='grid grid-cols-5 gap-5 container mx-auto pt-10 '>
                            {
                                product.map(pr => <ShopCard
                                    key={pr._id}
                                    productName={pr.productName}
                                    productImg={pr.productImg}
                                    productId={pr._id}
                                    productPrice={pr.productPrice}
                                />)
                            }
                        </div>
                        <div className='mt-10 flex justify-center'>
                            <div className='flex gap-5'>
                                <button onClick={() => handlePaginate(0)} className='btn font-sans'>previous</button>
                                <p className='font-sans text-3xl text-gray-400'>{page}/{Math.ceil(length/20)}</p>
                                <button onClick={() => handlePaginate(1)} className='btn font-sans'>next</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Shop