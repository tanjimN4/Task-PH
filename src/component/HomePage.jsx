"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Post from "./Post";
import Crud from "./Crud";

const HomePage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Redirect to signup page if the user is not authenticated
        if (status === "unauthenticated") {
            router.push("/signup");
        }
    }, [status, router]);

    if (status === "loading") {
        // Display loading message or spinner
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="mt-10">
            {status === "authenticated" ? (
                <div>
                    <div className="flex items-center justify-between mx-10 mt-10">
                    <div><h1 className="text-xl mb-4">Welcome, {session.user.name || session.user.email}</h1></div>
                    <div className="">
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="btn btn-primary"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
                <div className="text-center font-extrabold my-10 text-3xl">CRUD</div>
                <div className="mx-10">
                    <Post></Post>
                </div>
                <div className="">
                    <h1 className="text-3xl text-center my-10 font-extrabold">Get Delete And Update</h1>
                    <Crud></Crud>
                </div>
                </div>
            ) : (
                <p className="text-lg">You are not logged in.</p>
            )}
        </div>
    );
};

export default HomePage;
