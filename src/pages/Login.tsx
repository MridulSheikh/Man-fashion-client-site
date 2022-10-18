import { SubmitHandler, useForm } from "react-hook-form";
import { Blocks, RotatingLines } from "react-loader-spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Shared/Layout";
import useAuth from "../hooks/useAuth"

interface IFormInput {
  email: string;
  password: string;
}

function Login() {
  const { singInwitpass, isLoading, error, loacluser } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    singInwitpass(data.email, data.password)
  };

  const navigate = useNavigate();
  const location = useLocation();
  // @ts-ignore
  const from = location.state?.from.pathname || '/';

  if (loacluser.email) {
    navigate(from)
  }

  return (
    <Layout>
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
                isLoading && <div className='flex items-center my-2'>
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="35"
                    visible={true}
                  />
                  <span className="ml-1 font-sans font-semibold">please wait</span>
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
    </Layout>
  )
}

export default Login