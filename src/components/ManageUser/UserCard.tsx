import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

interface props {
    email: string;
    displayName: string;
    imgUrl: string;
    admin?: boolean;
    route: boolean;
    callfunc: any;
}

function UserCard({ email, displayName, imgUrl, admin, route, callfunc }: props) {

    const [success, setSuccess] = useState(false)

    const makeAdmin = (email: string) => {
        axios.patch(`http://localhost:5000/api/v1/user/${email}`)
            .then(res => {
                console.log(res)
                if (res.data.modifiedCount == 1) {
                    setSuccess(true)
                    // callfunc()
                }
            })
    }

    const removeAdmin = (email: string) => {
        axios.patch(`http://localhost:5000/api/v1/user/admin/${email}`)
            .then(res => {
                console.log(res)
                if (res.data.modifiedCount == 1) {
                    setSuccess(true)
                }
            })
    }

    useEffect(() => {
        if (success == true) {
            setTimeout(() => setSuccess(false), 3000)
        }
    }, [success])

    return (
        <>
            <div className='text-center m-6'>
                <div>
                    <div className="w-16 rounded-full m-auto">
                        <img src={imgUrl} alt="profile img" className='rounded-full' />
                    </div>
                </div>
                <div className='mt-4'>
                    {displayName}
                </div>
                <div>
                    {email}
                </div>
                <div className='mt-4'>
                    {
                        route ?
                            <button onClick={() => removeAdmin(email)} className={`btn btn-warning btn-sm ${!admin && "btn-disabled"}`} >Remove admin</button>
                            :
                            <button onClick={() => makeAdmin(email)} className={`btn btn-primary btn-sm ${admin && "btn-disabled"}`} >Make admin</button>
                    }
                </div>
            </div>
            {
                success &&
                <div className='fixed top-24 right-80 ' onClick={() => setSuccess(false)} >
                    <div className="alert alert-success shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {
                                route ?
                                    <span className='flex'>successfully remove admin : {email} </span>
                                    :
                                    <span className='flex'>successfully add admin : {email} </span>
                            }

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserCard