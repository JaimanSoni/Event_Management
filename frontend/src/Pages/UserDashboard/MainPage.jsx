import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/Navbar'
import axios from 'axios'

const SmallToast = ({ message }) => {
  return (
    <div className=' small-toast absolute min-w-[30px] px-[10px] w-fit text-nowrap min-h-[20px] transition-all duration-100 shadow-lg text-[12px] bg-[#393939de] rounded-[5px] right-0 text-white '>
      {message}
    </div>
  )
}

const Event = ({ id, name, start, end, venue, paid, type }) => {
  return (
    <div className='w-[280px] relative h-fit min-h-[365px] border-[1px] border-slate-600 rounded-[10px] p-[10px] '>
      <div className='w-full h-[130px] rounded-[5px] bg-slate-100 m-auto'>

      </div>
      <div className='mt-[10px] font-medium text-[18px] '>
        {name}
      </div>
      <div className='mt-[10px]'>
        <i class=" mr-[10px] fa-solid fa-calendar-days"></i>
        {start} - {end}
      </div>
      {
        type == "in-person" ?
          < div className='mt-[10px]'>
            <i class=" mr-[10px] fa-solid fa-location-dot"></i>
            {venue}
          </div>
          :
          < div className='mt-[10px]'>
            <i class="mr-[10px] fa-solid fa-globe"></i>
            Event is online
          </div>

      }
      <div className='h-[1px] w-full bg-[#8f8f8f] my-[20px] '></div>
      <div className='flex justify-between absolute w-[90%] h-[30px] bottom-0'>

        < div >
          {paid}
        </div>
        <div className='flex gap-[20px]'>
          <div className='relative'>
            <div className='cursor-pointer toast-parent '><i class="fa-solid fa-link"></i></div>
            <SmallToast message={"Go to event page"} />
          </div>

          <div className='relative'>
            <div className=' cursor-pointer toast-parent '><i class="fa-solid fa-share"></i></div>
            <SmallToast message={"Copy Link"} />
          </div>

          <div className='relative'>
            <div className=' cursor-pointer toast-parent '><i class="fa-solid fa-gear"></i></div>
            <SmallToast message={"Event Dashboard"} />
          </div>
          <div className='relative'>
            <div className=' cursor-pointer toast-parent '><i class="fa-solid fa-clone"></i></div>
            <SmallToast message={"Clone"} />
          </div>
        </div>
      </div>
    </div >
  )
}


export default function MainPage() {
  const [currentPage, setCurrentPage] = useState("Active")
  const [events, setEvents] = useState([])
  const getEvents = async () => {
    const response = await axios.get("http://localhost:8000/api/events/user-events", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    if (response.data.success) {
      setEvents(response.data.events)
      console.log(response.data.events)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])
  return (
    <div>
      <Navbar />

      <div className='w-[80%] m-auto min-h-screen h-fit py-[50px]'>
        {/* Main Page topbar  */}
        <div className='flex justify-between items-center'>
          <div>
            <input type="text" placeholder='Search Event...' className='w-[300px] h-[40px] rounded-[5px] px-[10px] border-[1px] border-[#606060] ' />
          </div>
          <div className='w-[200px] cursor-pointer h-[50px] bg-slate-100 flex justify-center items-center px-[8px] rounded-[5px]'>
            <div onClick={() => setCurrentPage("Active")} className={` ${currentPage == "Active" ? "bg-slate-400" : null} w-full h-[70%] flex justify-center items-center rounded-[5px]`}>
              Active
            </div>
            <div onClick={() => setCurrentPage("Past")} className={` ${currentPage == "Past" ? "bg-slate-400" : null} w-full h-[70%] flex justify-center items-center rounded-[5px]`}>
              Past
            </div>
          </div>
        </div>

        {/* Main page event list page  */}
        {
          currentPage == "Active" ?
            <div className='flex flex-wrap justify-center gap-[30px] mt-[50px]'>
              {
                events != [] ?
                  events.map((event) => (
                    <Event id={event._id} name={event.name} start={event.startsOn} end={event.endsOn} paid={event.eventType} venue={event.venue} type={event.eventMode} />
                  ))
                  :
                  null
              }
            </div>
            :
            <div className='flex flex-wrap justify-center gap-[30px] mt-[50px]'>
              <Event />
              <Event />
              <Event />
              <Event />
            </div>

        }
      </div>

    </div>
  )
}
