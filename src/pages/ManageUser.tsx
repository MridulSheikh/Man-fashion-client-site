import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { RotatingLines } from 'react-loader-spinner'
import DahboardLayout from '../components/dashboard/DahboardLayout'
import UserCard from '../components/ManageUser/UserCard'

function ManageUser() {

  const [user, setUser] = useState<any[]>([])
  const [loading, setIsLoading] = useState(false)
  const [searchInput, setSearchInput] = useState<string>();

  useEffect(() => {
    setIsLoading(true)
    axios.get("http://localhost:5000/api/v1/user")
      .then(res => {
        const user = res.data.body
        const filterUser = user.filter((usr: any) => usr.admin == false)
        setUser(filterUser)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const getAll = () => {
    setIsLoading(true)
    axios.get("http://localhost:5000/api/v1/user")
      .then(res => {
        const user = res.data.body
        const filterUser = user.filter((usr: any) => usr.admin == false)
        setUser(filterUser)
      })
      .finally(() => setIsLoading(false))
  }

  const searchUser = () => {
    setIsLoading(true)
    axios.get(`http://localhost:5000/api/v1/user/getOne/${searchInput}`)
      .then(res => {
        setUser(res.data)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <DahboardLayout>
      <div className='flex justify-between px-24 sticky top-0 bg-white py-4'>
        <div className="form-control">
          <div className="input-group">
            <input onBlur={(e) => setSearchInput(e.target.value)} type="text" placeholder="Search by email" className="input input-bordered" />
            <button onClick={searchUser} className="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center text-2xl'>
          <BsFillPersonFill />
          /
          {user.length}
        </div>
        <button onClick={getAll} className="btn ">
          Refresh
        </button>
      </div>
      {
        loading ?
          <div className=' py-48 flex justify-center items-center '>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="35"
              visible={true}
            />
          </div>
          :
          <div>
            <div className='grid grid-cols-4'>
              {
                user.map(user => <UserCard key={user.email} email={user.email} displayName={user.displayName} imgUrl={user.imgUrl} admin={user.admin} route={false} callfunc={getAll} />)
              }
            </div>
          </div>
      }

    </DahboardLayout>
  )
}

export default ManageUser