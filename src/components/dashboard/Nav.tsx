import React from 'react'
import { ImUserCheck } from 'react-icons/im'
import {RiShirtLine, RiShoppingCartLine} from 'react-icons/ri'
import {GrUserAdmin} from 'react-icons/gr'
import {FiLogOut} from 'react-icons/fi'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'
import { AiFillMessage, AiOutlineRollback } from 'react-icons/ai';

function Nav({ children }: any) {
  const { loacluser, logout } = useAuth();
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content items-center justify-center">
        {children}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

      </div>
      <div className="drawer-side">
        <div>
        </div>
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-gray-300 text-base-content h-screen">
          {/* <!-- Sidebar content here --> */}

          <div className='flex items-center m-4'>
            <div>
              <img src={loacluser?.imgUrl} alt="" className='w-10 h-10 rounded-full' />
            </div>
            <div className='ml-2'>
              <div className='flex'>
                <h1>{loacluser.displayName}</h1>
                <div className=' badge ml-2 badge-sm mt-1'>root</div>
              </div>
              <h1 className='text-xs mt-0'>{loacluser.email}</h1>
            </div>
          </div>
          <Link to="/manageuser">
            <li>
              <div className='flex items-center'>
                <ImUserCheck />
                <span>manage user</span>
              </div>
            </li>
          </Link>
          <Link to="/manageproduct">
            <li>
              <div className='flex items-center'>
                <RiShirtLine />
                <span>product</span>
              </div>
            </li>
          </Link>
          <Link to="/manageorder">
            <li>
              <div className='flex items-center'>
                <RiShoppingCartLine />
                <span>order</span>
              </div>
            </li>
          </Link>
          <Link to="/manageadmin">
            <li>
              <div className='flex items-center'>
                <GrUserAdmin />
                <span>admin</span>
              </div>
            </li>
          </Link>
          <Link to="/managemessage">
            <li>
              <div className='flex items-center'>
                <AiFillMessage />
                <span>message</span>
              </div>
            </li>
          </Link>
            <li onClick={logout}>
              <div className='flex items-center'>
                <FiLogOut />
                <span>logout</span>
              </div>
            </li>
            <Link to="/">
            <li>
              <div className='flex items-center'>
                <AiOutlineRollback />
                <span>Back to home</span>
              </div>
            </li>
          </Link>
        </ul>

      </div>
    </div>
  )
}

export default Nav