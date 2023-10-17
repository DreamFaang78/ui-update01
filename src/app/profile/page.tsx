"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Navbar from "../../components/Navbars";
import {Button} from "@nextui-org/react";
export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }
    const getUserDetails1 = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data.username)
    }

    return (
        <div>
            <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="mb-10">
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <br />
            <br />
        <Button color="primary" variant="shadow" onClick={getUserDetails1}>
        Fetch Your Name
      </Button> 
      </div>
        <br /> 
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <hr />
        <br />

        <button className="p-1 rounded bg-green-500" onClick={getUserDetails}>Get User Details</button>
        {/* <button className="p-1 rounded bg-green-500" onClick={getUserDetails1}>Get User Details</button> */}



            </div>
            </div>
    )
}