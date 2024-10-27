"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';

const Signup = () => {
    const router = useRouter()
    const handleSignUp = async (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        
        // Check if passwords match
        if (password !== confirmPassword) {
            Swal.fire({
                position: "top-end",
                title: "Passwords do not match",
                icon: "error",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            password
        };

        try {
            const res = await fetch('/signup/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });

            if(res.ok){
                const { email } = newUser;
                // console.log(email);
                const signInRes=await signIn('credentials',{
                    email,password,redirect:false
                })
                if(signInRes.ok){
                    router.push('/')
                }else{
                    Swal.fire({
                        position: "top-end",
                        title: signInRes.error || "Sign in failed",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                position: "top-end",
                title: "An error occurred",
                icon: "error",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
                    <form onSubmit={handleSignUp}>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text text-black text-xl font-medium">Username</span>
                            </label>
                            <input type="text" name='name' placeholder="Enter your username" className="input bg-white input-bordered w-full" required />
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text text-black text-xl font-medium">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Enter your email" className="input bg-white input-bordered w-full" required />
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text text-black text-xl font-medium">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Enter your password" className="input bg-white input-bordered w-full" required />
                        </div>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text text-black text-xl font-medium">Confirm Password</span>
                            </label>
                            <input type="password" name='confirmPassword' placeholder="Confirm your password" className="input bg-white input-bordered w-full" required />
                        </div>
                        <div className="flex items-center mb-4">
                            <input type="checkbox" className="checkbox" required />
                            <label className="label cursor-pointer ml-2">
                                <span className="label-text">I agree to the Terms and Conditions</span>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                    </form>
                    <h1 className='text-center my-5'>Already Have An Account? <Link className='text-red-700 font-semibold' href={"/login"}>Sign In</Link></h1>
                </div>
            </div>
        </div>
    );
};

export default Signup;
