import { SubmitHandler, useForm } from "react-hook-form";
import { Blocks } from "react-loader-spinner";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"

interface IFormInput {
  email: string;
  password: string;
}

function Login() {
  const {singInwitpass, isLoading, error } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    singInwitpass(data.email, data.password)
  };


  return (
    <div className="container mx-auto">
      <div className="w-full flex justify-center">
        <div className="my-32 p-5 shadow-md ">
          <h1 className="text-2xl font-bold text-gray-500 font-sans">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div>
              <span className="font-sans">Email*</span><br />
              <span className='text-red-500 font-sans'>{errors.email && errors.email.message}</span>
              <input {...register("email", { required: { value: true, message: "E-mail field reqruired" } })} className="font-sans border py-1 px-3 w-full" type="email" />
            </div>
            <div className="mt-5">
              <span className="font-sans">Password*</span><br />
              <span className='text-red-500 font-sans'>{errors.password && errors.password.message}</span>
              <input {...register("password", { required: { value: true, message: "password field reqruired" } })} className="font-sans border py-1 px-3 w-full" type="password" />
            </div>
            {
              isLoading && <div className='text-center mt-5'>
                <Blocks
                  height="40"
                  width="400"
                  color="#4fa94d"
                  ariaLabel="audio-loading"
                  wrapperStyle={{}}
                  wrapperClass="wrapper-class"
                  visible={true}
                />
              </div>
            }
            <span className='text-red-500 font-sans'>{error}</span>
            <button className="btn  btn-sm w-full font-sans mt-5">Login</button>
          </form>
          {/* <button onClick={singinWithGoogle} className="btn btn-info text-white  btn-sm w-full font-sans mt-3">Login With Google</button> */}
          <Link to="/singup">
            <button className="btn btn-outline btn-sm w-full font-sans mt-3">singup</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login