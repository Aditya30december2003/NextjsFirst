"use client"
import React , {useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import {useRouter} from 'next/navigation'


export default function ProfilePage(){
    const router = useRouter();
    const [data , setData] = React.useState("nothing")


    const getUserDetails = async()=>{
     const res = await axios.get("/api/users/me")

     console.log(res.data)
     setData(res.data.data._id)   //the data._id is the part of response json of me route
    }


    const onLogout = async()=>{
     try {
       const response = await axios.get("/api/users/logout")

       router.push("/login")
     } catch (error:any) {
        console.log(error.message)

     }
    }
    return (
        <>
        <div className="text-[1.3rem] mt-[15rem] text-white text-center">Profile Page</div>
        <div className="text-[1.3rem]  text-white text-center">{data=== "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</div>
        <div onClick={onLogout} className="text-center"><button className="text-black bg-white font-bold p-2">Logout</button></div>
        <div onClick={getUserDetails} className="text-center mt-3"><button className="text-black bg-white font-bold p-2">Get User Details</button></div>
        </>
    )
}