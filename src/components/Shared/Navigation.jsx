import userEvent from '@testing-library/user-event'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';


function Navigation() {
    const [down, setDown] = useState(false);
    const {user, logout} = useAuth();

    const controler = () => {
        if (window.scrollY > 100) {
            setDown(true)
        } else {
            setDown(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', controler)
    }, [])
    return (
        <div className={`navbar bg-white sticky top-0 z-50 py-3 xl:px-10 ease-in-out duration-200 ${down && "drop-shadow-md bg-cyan-100"}`}>
            <div className="flex-1">
                <a href="/#">
                    <p className="font-bold text-2xl">Men For Fashion</p>
                </a>
            </div>
            <div className="flex-none">
                <div className='flex justify-between items-center'>
                    <Link to="/shop"><p className='mx-7'>Shop</p></Link>
                    <a href="/#best"><p>Our Best</p></a>
                    <a href="/#testimonial"><p className='mx-7'>Testimonail</p></a>
                    <a href="/#contact"><p>Contact</p></a>
                </div>
                <div className="dropdown dropdown-end md:mx-5">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn font-sans">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    user.email ? 
                    <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user.photoURL} alt="profile img"/>
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                <span className="badge">{user.displayName}</span>
                            </a>
                        </li>
                        <li><a>Dashboard</a></li>
                        <li onClick={logout}><a>Logout</a></li>
                    </ul>
                </div>
                :
                <Link to="/login">
                  <button className='btn font-sans'>login</button>
                </Link>
                }
            </div>
        </div>
    )
}

export default Navigation