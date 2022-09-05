import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"


function Login() {
  const {singinWithGoogle} = useAuth();
  return (
    <div className="container mx-auto">
         <div className="w-full flex justify-center">
            <div className="my-32 p-5 shadow-md ">
              <h1 className="text-2xl font-bold text-gray-500 font-sans">Login</h1>
              <form className="mt-6">
                <div>
                  <span className="font-sans">Email*</span><br />
                  <input className="font-sans border py-1 px-3 w-full" type="email" />
                </div>
                <div className="mt-5">
                  <span className="font-sans">Password*</span><br />
                  <input className="font-sans border py-1 px-3 w-full" type="password" />
                </div>
                <button className="btn  btn-sm w-full font-sans mt-5">Login</button>
              </form>
              <button onClick={singinWithGoogle} className="btn btn-info text-white  btn-sm w-full font-sans mt-3">Login With Google</button>
              <Link to="/singup">
                <button className="btn btn-outline btn-sm w-full font-sans mt-3">singup</button>
              </Link>
            </div>
         </div>
    </div>
  )
}

export default Login