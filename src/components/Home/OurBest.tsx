import OurBestCard from './OurBestCard'
const img1 = require('../../assets/img/Banner3.jpg') 
const img2 = require('../../assets/img/Banner2.jpg') 
const img3 = require('../../assets/img/Banner1.jpg') 

function OurBest() {
    const data = [img1, img2, img3]
  return (
    <div id="best" className='pt-32'>
        <h1 className='text-center text-3xl'>Our Best For You</h1>
        <div className='grid md:grid-cols-3 container mx-auto mt-24'>
          {
            data.map(dt => <OurBestCard img={dt} price={20} name="name" title='title' brand="brand" link='link' id="id" />)
          }
        </div>
    </div>
  )
}

export default OurBest