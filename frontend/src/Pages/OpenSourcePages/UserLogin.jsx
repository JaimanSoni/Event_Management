import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation (can be expanded)
        if (!email || !password) {
            toast.error("Email and password are required!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", {
                email,
                password
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token)
                toast.success("Login successful!");
                setTimeout(() => {
                    window.location.href = "/"; // Adjust the path as needed
                }, 2000);
                // You can redirect the user or handle other logic here after successful login
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className='flex justify-center items-center w-full h-screen overflow-hidden'>
            <div className='rounded-[10px] w-[400px] border-[1px] border-black m-auto h-fit bg-white pb-[40px]'>
                <div className='flex justify-center h-[100px] items-center gap-[10px]'>
                    <img src="logo.svg" className='w-[30px] rounded-[50%]' alt="Logo" />
                    <span className='text-[22px] font-medium'>Planorama</span>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-[30px]'>
                    {/* Email field */}
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email...'
                            className='input-box w-[320px]'
                        />
                    </div>

                    {/* Password field */}
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <div className="w-full flex flex-col gap-[10px]">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-box w-[320px]"
                                placeholder="Enter your password..."
                            />
                            {showPassword ? (
                                <div className='cursor-pointer' onClick={() => setShowPassword(false)}>
                                    <i className="fa-solid fa-eye text-[#323232] cursor-pointer"></i> Hide Password
                                </div>
                            ) : (
                                <div className='cursor-pointer' onClick={() => setShowPassword(true)}>
                                    <i className="fa-solid fa-eye-slash text-[#323232] cursor-pointer"></i> Show Password
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button className='w-[320px] h-[40px] bg-slate-500 text-white' type='submit'>
                            Sign In
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className='text-[16px]'>
                        Don't have an account?
                        <a href="/signup" className='font-medium ml-[5px] text-slate-700'>
                            Sign Up
                        </a>
                    </div>
                </form>
            </div>

            {/* Toaster for notifications */}
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}
