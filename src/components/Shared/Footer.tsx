import {AiFillInstagram, AiFillTwitterCircle, AiFillAmazonCircle} from 'react-icons/ai'
import {BsFacebook} from 'react-icons/bs'

function Footer() {
  return (
    <div className='flext justify-center w-full py-6 mt-24 text-center border border-b-0 '>
      <div className='flex justify-center'>
            <a href="#" className='text-3xl'> <AiFillInstagram /></a>
            <a href="#" className='text-3xl mx-4'> <BsFacebook /></a>
            <a href="#" className='text-3xl'> <AiFillTwitterCircle /></a>
            <a href="#" className='text-3xl mx-4'> <AiFillAmazonCircle /></a>
        </div>
        <p className='font-sans mt-3'>Copyright © 2022 MenForFashion</p>
    </div>
  )
}

export default Footer