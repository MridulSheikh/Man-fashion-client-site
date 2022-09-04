
const  pic = require("../../assets/img/girl.jpg")

interface props {
    name: string;
    body : string;
    img : string;
}

function TestimonialCard({name, body, img} : props) {
  return (
    <div className="p-3 xl:p-5 text-center drop-shadow-md rounded-md">
        <img src={pic} className="rounded-full mx-auto" width="50%" />
        <h1 className="my-5 text-2xl font-bold">{name}</h1>
        <p className="w-8/12 text-center mx-auto">{body}</p>
    </div>
  )
}

export default TestimonialCard