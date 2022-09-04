import { Link } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi'
interface props {
    img: string;
    name: string;
    title: string;
    price: number;
    brand: string;
    link: string;
    id: string;
}

function OurBestCard({ name, title, price, brand, img, link, id }: props) {
    return (
        <Link to={link}>
            <div className='mx-5 rounded-md group overflow-hidden shadow-2xl relative'>
                <img src={img} alt="" className='w-full' />
                <div className='p-3 duration-300 ease-in-out effect-card w-full h-10 group-hover:h-full absolute text-white bottom-0 '>
                    <div className='text-2xl font-normal mb-3 flex justify-between'>
                        <p>{brand}</p>
                        <BiRightArrowAlt />
                    </div>
                    <div className='mt-16 text-center'>
                        <p className='text-yellow-500 text-4xl' >${price}</p>
                        <p>{name}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OurBestCard