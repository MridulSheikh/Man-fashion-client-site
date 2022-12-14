import userEvent from '@testing-library/user-event'
import { useEffect, useState } from 'react'
import { AiOutlineDashboard, AiOutlineLogout, AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';


function Navigation() {
    const [down, setDown] = useState(false);
    const { loacluser, logout } = useAuth();

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
                            <Link to="/cart">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </Link>
                        </div>
                    </label>
                </div>
                {
                    loacluser?.email ?
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={loacluser?.imgUrl} alt="profile img" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="flex">
                                        <AiOutlineMail />
                                        <span className="font-sans font-semibold ml-1">{loacluser?.email}</span>
                                    </a>
                                </li>
                                {
                                    loacluser.admin && 
                                    <li>
                                    <Link to="/manageuser">
                                        <div className="flex items-center">
                                            <AiOutlineDashboard />
                                            <a className="font-sans font-semibold ml-4">Dashboard</a>
                                        </div>
                                    </Link>
                                </li>
                                }
                                <li onClick={logout} >
                                    <div className="flex items-center">
                                        <AiOutlineLogout />
                                        <a className="font-sans font-semibold">Logout</a>
                                    </div>
                                </li>
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