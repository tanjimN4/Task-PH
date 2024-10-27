"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const login = () => {
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value
        const res = await signIn('credentials', {
            email, password, redirect: false
        })
        if (res.ok) {
            router.push('/')
        }


    }

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text text-black text-xl font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name='email'

                                placeholder="Enter your email"
                                className="input input-bordered bg-white text-black w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text  text-black text-xl font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                name='password'
                                placeholder="Enter your password"
                                className="input text-black bg-white input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <input type="checkbox" className="checkbox" />
                            <label className="label cursor-pointer ml-2">
                                <span className="label-text text-black">Remember me</span>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Login
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <a href="#" className="link link-hover">
                            Forgot Password?
                        </a>
                    </div>
                    <h1 className='text-center my-5'>Create Account <Link className='text-red-700 font-semibold' href={"/signup"}>Sign Up</Link></h1>
                </div>
            </div>
        </div>
    );
};

export default login;