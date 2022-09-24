import React from 'react'
import { Link } from 'react-router-dom'

function PageNotfound() {
    return (
        <div className='container mx-auto w-full py-56 text-center'>
            <div>
                <h1 className='text-5xl font-sans'>Page Not Found !</h1>
                <Link to="/">
                    <button className='btn btn-sm font-sans mt-5'>Back to home</button>
                </Link>
            </div>
        </div>
    )
}

export default PageNotfound