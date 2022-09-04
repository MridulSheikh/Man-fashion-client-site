import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom"
import TestimonialCard from "./TestimonialCard"

function Testimonial() {
  const revew = [
    {
      name: "Alia Bat",
      body: "t's always a pleasure to work with Will and his team. They are personable, responsive, and results-oriented!",
      img: "https://media.istockphoto.com/photos/side-view-of-one-young-woman-picture-id1134378235?b=1&k=20&m=1134378235&s=170667a&w=0&h=MLeQzU2jUoBEacUzjQWJkPMcBabuAj2tk4PMDLDXQnI="
    },
    {
      name: "Alia Bat",
      body: "t's always a pleasure to work with Will and his team. They are personable, responsive, and results-oriented!",
      img: "https://media.istockphoto.com/photos/side-view-of-one-young-woman-picture-id1134378235?b=1&k=20&m=1134378235&s=170667a&w=0&h=MLeQzU2jUoBEacUzjQWJkPMcBabuAj2tk4PMDLDXQnI="
    },
    {
      name: "Alia Bat",
      body: "t's always a pleasure to work with Will and his team. They are personable, responsive, and results-oriented!",
      img: "https://media.istockphoto.com/photos/side-view-of-one-young-woman-picture-id1134378235?b=1&k=20&m=1134378235&s=170667a&w=0&h=MLeQzU2jUoBEacUzjQWJkPMcBabuAj2tk4PMDLDXQnI="
    },
    {
      name: "Alia Bat",
      body: "t's always a pleasure to work with Will and his team. They are personable, responsive, and results-oriented!",
      img: "https://media.istockphoto.com/photos/side-view-of-one-young-woman-picture-id1134378235?b=1&k=20&m=1134378235&s=170667a&w=0&h=MLeQzU2jUoBEacUzjQWJkPMcBabuAj2tk4PMDLDXQnI="
    },
    {
      name: "Alia Bat",
      body: "t's always a pleasure to work with Will and his team. They are personable, responsive, and results-oriented!",
      img: "https://media.istockphoto.com/photos/side-view-of-one-young-woman-picture-id1134378235?b=1&k=20&m=1134378235&s=170667a&w=0&h=MLeQzU2jUoBEacUzjQWJkPMcBabuAj2tk4PMDLDXQnI="
    }
  ]
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div id="testimonial" className='pt-32 container mx-auto'>
      <h1 className='text-4xl text-center'>Testimonial</h1>
      <div className="w-full mt-24">
        <Carousel  removeArrowOnDeviceType={["desktop","uperLargeDesktop","tablet", "mobile"]}  showDots={true} responsive={responsive}>
          {
            revew.map(rev => <TestimonialCard name={rev.name} body={rev.body} img={rev.img} />)
          }
        </Carousel>
      </div>
    </div>
  )
}

export default Testimonial