import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'  // Import react-hot-toast

export default function CreateEvent() {
    const [eventName, setEventName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [eventMode, setEventMode] = useState("in-person");
    const [venue, setVenue] = useState("")
    const [onlineLink, setOnlineLink] = useState("")
    const [eventPaid, setEventPaid] = useState(null);
    const [eventAmount, setEventAmount] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Show loading toast
        const loadingToast = toast.loading("Creating event...");

        try {
            // Make API call
            const response = await axios.post(
                "http://localhost:8000/api/events/create",
                {
                    name: eventName,
                    startsOn: startDate,
                    endsOn: endDate,
                    eventMode: eventMode,
                    venue: eventMode === "in-person" ? venue : null,
                    onlineLink: eventMode === "online" ? onlineLink : null,
                    eventType: eventPaid ? "Paid" : "Free",
                    amount: eventAmount
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            // If successful, show success toast and clear the form
            toast.success("Event created successfully!", {
                id: loadingToast // Close the loading toast
            });
            // setTimeout(() => {
                window.location.href = "/"; // Adjust the path as needed
            // }, 2000);

            // Clear all form data
            setEventName("");
            setStartDate("");
            setEndDate("");
            setEventMode("in-person");
            setVenue("");
            setOnlineLink("");
            setEventPaid(null);
            setEventAmount(0);
        } catch (error) {
            // If there's an error, show error toast
            toast.error("Failed to create event.", {
                id: loadingToast // Close the loading toast
            });
        }
    }

    return (
        <div>
            <Navbar keepCreateEvent={false} />
            <div className='w-full min-h-[500px] py-[50px] bg-slate-50 h-fit m-auto'>
                <div className='w-[80%] min-h-[500px] h-fit bg-white shadow-lg m-auto rounded-[10px] py-[30px]'>
                    <form onSubmit={handleSubmit} className='w-[90%] m-auto flex flex-col gap-[30px]'>
                        <div className='text-[29px] font-medium'>
                            Create Event
                        </div>
                       
                        <div>
                            <label htmlFor="">Event Name</label>
                            <input
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                className='input-box w-full'
                            />
                        </div>
                        <div className='flex md:flex-row flex-col gap-[30px]'>
                            <div className='w-full'>
                                <label htmlFor="">Start Date</label>
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className='input-box w-full'
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="">End Date</label>
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className='input-box w-full'
                                />
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col gap-[30px]'>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="">Event Mode</label>
                                <select
                                    value={eventMode}
                                    onChange={(e) => setEventMode(e.target.value)}
                                    className='input-box'
                                >
                                    <option value="in-person">In Person</option>
                                    <option value="online">Online</option>
                                </select>
                            </div>
                            <div className='w-full'>
                                <label htmlFor="">Event Type</label>
                                <div className='w-[120px] cursor-pointer h-[40px] bg-slate-100 flex justify-center items-center px-[8px] rounded-[5px]'>
                                    <div onClick={() => setEventPaid(false)} className={` ${eventPaid == false ? "bg-slate-400" : null} w-full h-[70%] flex justify-center items-center rounded-[5px]`}>
                                        Free
                                    </div>
                                    <div onClick={() => setEventPaid(true)} className={` ${eventPaid == true ? "bg-slate-400" : null} w-full h-[70%] flex justify-center items-center rounded-[5px]`}>
                                        Paid
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            eventPaid &&
                            <div className='flex md:flex-row flex-col gap-[30px]'>
                                <div className='w-full'>
                                    <label htmlFor="">Amount</label>
                                    <input
                                        type="number"
                                        value={eventAmount}
                                        onChange={(e) => setEventAmount(e.target.value)}
                                        className='input-box w-full'
                                        placeholder='Enter amount...'
                                    />
                                </div>
                            </div>
                        }

                        <div className='flex md:flex-row flex-col gap-[30px]'>
                            {
                                eventMode === "in-person" ?
                                    <div className='w-full'>
                                        <label htmlFor="">Venue</label>
                                        <input
                                            type="text"
                                            value={venue}
                                            onChange={(e) => setVenue(e.target.value)}
                                            className='input-box w-full'
                                            placeholder='Enter event venue...'
                                        />
                                    </div>
                                    : eventMode === "online" ?
                                        <div className='w-full'>
                                            <label htmlFor="">Event Link</label>
                                            <input
                                                type="text"
                                                value={onlineLink}
                                                onChange={(e) => setOnlineLink(e.target.value)}
                                                className='input-box w-full'
                                                placeholder='Enter event link...'
                                            />
                                        </div>
                                        : null
                            }
                        </div>
                        <div>
                            <button type="submit" className='w-[200px] h-[40px] bg-slate-500 text-white'>
                                Create Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />

        </div>
    )
}
