import React, { useState } from 'react'
import axios from "axios";
import UserProfile from "../assets/UserProfile.png"

export default function Navbar(props) {
  const [popup, setPopup] = useState(false)
  // const logout = async () => {
  //   const response = await axios.post("")
  // }
  return (
    <div className='flex justify-between items-center text-white px-[8vw] h-[200px] bg-slate-600 '>
      <div className='text-[40px] font-medium flex items-center gap-[10px]'>
        <img src="logo.svg" className='w-[40px]' alt="" />
        <span>
          Planorama
        </span>
      </div>
      <div className='relative flex justify-center items-center gap-[20px]'>
        {
          props.keepCreateEvent === false ? null :
            <a href='/create-event' className='w-[150px] flex justify-center items-center h-[35px] hover:scale-105 transition-all duration-75 rounded-[5px] border-[1px] border-[#b9b9b9] '>Create Event <i className="fa-solid fa-plus text-[12px] ml-[10px] "></i></a>

        }
        <div onClick={() => setPopup(!popup)} className='cursor-pointer flex justify-center items-center w-[40px] h-[40px] rounded-[50%]' >
        <img src={UserProfile} className='w-full' alt="" />

        </div>
        {
          popup ?
            <div className='absolute z-[1000] right-[6px] w-fit h-fit min-w-[280px] min-h-[120px] bg-white shadow-xl rounded-[10px] top-[50px]  '>
              <div className='p-[20px] flex justify-between items-center'>
                <div className=' cursor-pointer  flex justify-center items-center w-[40px] h-[40px] rounded-[50%]' >
                  <img src={UserProfile} className='w-full' alt="" />
                </div>
                <div className='text-black'>
                  <div className='text-[19px] font-medium'>
                    Jaiman Soni
                  </div>
                  <div>
                    jaimansoni@gmail.com
                  </div>
                </div>
              </div>
              <div className='h-[1px] w-full bg-black'></div>
              <ul className='p-[20px] text-black'>
                <a href="/profile">
                  <li className='h-[35px] flex items-center hover:bg-slate-50 w-full px-[10px] cursor-pointer'>Manage Profile</li>
                </a>
                <a href="/">
                  <li className='h-[35px] flex items-center hover:bg-slate-50 w-full px-[10px] cursor-pointer'>Dashboard</li>
                </a>
                <a href="/login">
                  <li className='h-[35px] flex items-center hover:bg-slate-50 w-full px-[10px] cursor-pointer'>Logout</li>
                </a>
              </ul>

            </div>
            :
            null
        }
      </div>
    </div>
  )
}
