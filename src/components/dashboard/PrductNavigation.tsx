import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'


function PrductNavigation() {

    const[catagoray, setCatagoray] = useState<string>("all");

    return (
        <div className='flex px-16 py-5 sticky top-0 justify-between shadow-md '>
            <div>
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search by title, name" className="input input-bordered" />
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex items-center '>
                <div className='mr-7'>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn m-1">{catagoray}</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li onClick={()=>setCatagoray("jines")} ><a>Jines</a></li>
                            <li onClick={()=>setCatagoray("shirt")} ><a>Shirt</a></li>
                            <li onClick={()=>setCatagoray("t-shirt")} ><a>T-Shirt</a></li>
                            <li onClick={()=>setCatagoray("shoies")} ><a>shoies</a></li>
                            <li onClick={()=>setCatagoray("watches")} ><a>watches</a></li>
                            <li onClick={()=>setCatagoray("all")} ><a>All</a></li>
                        </ul>
                    </div>
                </div>
                <button className='text-2xl btn rounded-md'><AiOutlinePlus /></button>
            </div>
        </div>
    )
}

export default PrductNavigation