import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { MdCloudUpload } from 'react-icons/md'
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from 'react';
import { Blocks, RotatingLines } from 'react-loader-spinner'
import Layout from '../components/Shared/Layout';

interface IFormInput {
  email: string;
  displayName: string;
  address: string;
  password: string;
  files: any;
}

function Singup() {
  const { singUpwithpass, error, isLoading } = useAuth()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>();
  const [profileimg, setProfileimg] = useState<Blob>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    singUpwithpass(data.email, data.password, data.displayName, data.address, profileimg)
    reset();
  }

  const imgHandler = (e: any) => {
    if (e.target.files.length !== 0) {
      setProfileimg(e.target.files[0])
    }
  }
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="w-full flex justify-center">
          <div className="p-5 mt-5 shadow-md ">
            <h1 className="text-2xl font-bold text-gray-500 font-sans">Singup</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <div className='w-full'>
                <img src={profileimg ? URL.createObjectURL(profileimg!) : `https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg`} alt="" className="w-20 h-20 text-center my-3 rounded-full mx-auto" />
              </div>
              <div className='relative w-full flex justify-center'>
                <input className="font-sans w-full opacity-0 cursor-pointer" accept='image/*' type="file" onChange={imgHandler} required />
                <label htmlFor='upload-button' className='flex font-sans px-4 rounded-md gorup-hover:bg-black group-hover:cursor-pointer group-hover:text-white border-2 border-black text-black py-1 text-center absolute top-0 -z-10'><MdCloudUpload className='text-2xl mr-2' /> Chose a Photo</label>
              </div>
              <div className='mt-5'>
                <span className="font-sans">Email*</span><br />
                <span className='text-red-500 font-sans'>{errors.email && errors.email.message}</span>
                <input className="font-sans border py-1 px-3 w-full" type="email" {...register("email", { required: { value: true, message: "E-mail field reqruired" } })} />
              </div>
              <div className="mt-5">
                <span className="font-sans">Name*</span><br />
                <span className='text-red-500 font-sans'>{errors.displayName && errors.displayName.message}</span>
                <input className="font-sans border py-1 px-3 w-full" {...register("displayName", { required: { value: true, message: "Name field reqruired" } })} />
              </div>
              <div className="mt-5">
                <span className="font-sans">Address*</span><br />
                <span className='text-red-500 font-sans'>{errors.address && errors.address.message}</span>
                <input className="font-sans border py-1 px-3 w-full" {...register("address", { required: { value: true, message: "Address field reqruired" } })} />
              </div>
              <div className="mt-5">
                <span className="font-sans">Password*</span><br />
                <span className='text-red-500 font-sans'>{errors.password && errors.password.message}</span>
                <input className="font-sans border py-1 px-3 w-full" type="password" {...register("password", { required: { value: true, message: "password field reqruired" } })} />
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
              <button className="btn  btn-sm w-full font-sans mt-5">Singup</button>
            </form>
            {/* <button onClick={singinWithGoogle} className="btn btn-info text-white  btn-sm w-full font-sans mt-3">Login With Google</button> */}
            <Link to="/login">
              <button className="btn btn-outline btn-sm w-full font-sans mt-3">singin</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Singup