import React, { useState } from 'react';
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function UserSignup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !password || !password2) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (password !== password2) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const data = { name, email, password };

            // Make API request to register user
            const response = await axios.post("http://localhost:8000/api/auth/register", data);

            if (response.status === 201) {
                toast.success("Registration successful!");
                // Redirect user to login or another page
                setTimeout(() => {
                    window.location.href = "/login"; // Adjust the path as needed
                }, 2000);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);

            // Handle specific error responses
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen overflow-hidden">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="rounded-[10px] w-[400px] border-[1px] border-black  m-auto h-fit min-h-[500px] pb-[50px] bg-white">
                <div className="flex justify-center h-[100px] items-center gap-[10px]">
                    <img src="logo.svg" className="w-[30px] rounded-[50%]" alt="" />
                    <span className="text-[22px] font-medium">Planorama</span>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[20px]">
                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name..."
                            className="input-box w-[320px]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email..."
                            className="input-box w-[320px]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Create Password</label>
                        <div className="w-full flex flex-col gap-[10px]">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-box w-[320px]"
                                placeholder="Create password..."
                            />
                            <div
                                className="cursor-pointer flex items-center gap-2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i
                                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-[#323232]`}
                                ></i>
                                {showPassword ? "Hide Password" : "Show Password"}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password2">Confirm Password</label>
                        <div className="w-full flex flex-col gap-[10px]">
                            <input
                                required
                                type={showPassword2 ? "text" : "password"}
                                name="password2"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                className="input-box w-[320px]"
                                placeholder="Confirm password..."
                            />
                            <div
                                className="cursor-pointer flex items-center gap-2"
                                onClick={() => setShowPassword2(!showPassword2)}
                            >
                                <i
                                    className={`fa-solid ${showPassword2 ? "fa-eye-slash" : "fa-eye"} text-[#323232]`}
                                ></i>
                                {showPassword2 ? "Hide Password" : "Show Password"}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="w-[320px] h-[40px] bg-slate-500 text-white" type="submit">
                            Sign Up
                        </button>
                    </div>
                    <div className="text-[16px]">
                        Already have an account?
                        <a href="/login" className="font-medium ml-[5px] text-slate-700">
                            Sign In
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
