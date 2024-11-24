import React from 'react'
import Navbar from '../../Components/Navbar'
import UserProfile from "../../assets/UserProfile.png"



export default function ManageProfile() {
    return (
        <div>
            <Navbar keepCreateEvent={false} />
            <div className='w-full min-h-[500px] h-fit py-[50px] bg-slate-50'>
                <div className=' w-full sm:w-[80%] m-auto min-h-[300px] h-fit bg-white shadow-lg py-[30px] sm:rounded-[10px]'>
                    <form action="" className='w-[90%] m-auto flex flex-col gap-[30px]'>
                        <div className='text-[29px] font-medium'>
                            Manage Profile
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center gap-[20px]'>
                            <div className=' w-full md:w-[60%] flex flex-col gap-[20px]'>
                                <div className='flex flex-col gap-[5px]'>
                                    <label htmlFor="">Name</label>
                                    <input type="text" placeholder='Enter your name...' className='input-box w-full' />
                                </div>
                                <div className='flex flex-col gap-[5px]'>
                                    <label htmlFor="">Email</label>
                                    <input type="email" placeholder='Enter your email...' className='input-box w-full' />
                                </div>
                            </div>
                            <div className='w-[200px] h-[200px] rounded-[10px] bg-slate-100'>
                                <img src={UserProfile} className='' alt="" />
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col gap-[20px]'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Mobile Number</label>
                                <input type="tel" className='input-box' placeholder='Mobile number' />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">City</label>
                                <input type="text" className='input-box' placeholder='City...' />
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col gap-[20px]'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Website</label>
                                <input type="text" className='input-box' placeholder='Website' />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Linkedin</label>
                                <input type="text" className='input-box' placeholder='Linkedin' />
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col gap-[20px]'>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Instagram</label>
                                <input type="text" className='input-box' placeholder='Instagram' />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="">Twitter</label>
                                <input type="text" className='input-box' placeholder='Twitter' />
                            </div>
                        </div>
                        <div>
                            <button className='w-[200px] h-[40px] bg-slate-500 text-white'>Update Profile</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
