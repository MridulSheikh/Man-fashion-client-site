import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CarouselCard from './CarouselCard';

function Carousels() {
    const items = [
        {
            title: "Men Collection",
            slogan: "Save up to 52% Free devlivery",
            Button: "Shop Now",
            link: "#"
        },
        {
            title: "Brand Watches",
            slogan: "Here is a look at top brands that implement stunning luxury watch website.",
            Button: "Shop Now",
            link: "#"
        },
        {
            title: "Brand Shirts",
            slogan: "20% offs out new collections",
            Button: "Shop Now",
            link: "#"
        }
    ]
    return (
        <div className='bg-banner bg-cover bg-center bg-no-repeat'>
            <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false} showIndicators={false}>
                {
                    items.map(item => <CarouselCard title={item.title} slogan={item.slogan} button={item.Button} link={item.link} />)
                }
            </Carousel>
        </div>
    )
}

export default Carousels