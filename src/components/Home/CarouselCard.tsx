import { Link } from 'react-router-dom';
interface props{
    title : String;
    slogan : String;
    link : String;
    button : String;
}


function CarouselCard({title, slogan, link, button} : props) {
  return (
    <div className='grid grid-cols-2 gap-3 py-20 '>
      <div>
        <h1 className='text-9xl'>{title}</h1>
        <p className='my-10'>{slogan}</p>
        <Link to="#"><button className='btn text-white'>{button}</button></Link>
      </div>
      <div></div>
    </div>
  )
}

export default CarouselCard