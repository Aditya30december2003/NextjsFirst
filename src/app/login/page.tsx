"use client"
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import {toast} from 'react-hot-toast'
import { on } from 'events';

export default function LoginPage(){
    const route = useRouter();
    const [buttonDisabled , setButtonDisabled] = React.useState(false)
    const [user , setUser] = React.useState({
        email:"",
        password:"",
    })

    const onLogin = async() =>{
    try {
      const response =  await axios.post("/api/users/login" , user)

      console.log("Login successfull " , response.data)

      route.push("/profile")
    } catch (error : any) {
        console.log(error.message);
    alert("Failed to Login");

    toast.error(error.message)
    }
    finally{

    }
    }

    useEffect(()=>{
        if(user.password.length>0 && user.email.length>0 ){
            setButtonDisabled(false)
            console.log("user enabled")
           }else{
               setButtonDisabled(true);
           }
    },[user])
    return (
        <>
        <div>
        <div>
      {/* overlay */}
      <div className='absolute top-0 left-0 bg-black/50 w-full h-screen'>
       {/* card */}
       <div className='bg-black/70 border-white border-2 mt-5 text-white w-[95%] md:w-[60%] lg:w-[37%] mx-auto p-10 '>
        <h1 className='text-[2rem] font-bold px-5'>Login</h1>
        <div className='flex flex-col gap-4'>
        <input value={user.email} onChange={(e)=>setUser({...user , email:e.target.value})} className='outline-none text-white bg-transparent border-gray-500 rounded-md p-3 w-[90%] mx-auto border-2'placeholder='Eamil' type="text" />
        <input value={user.password} onChange={(e)=>setUser({...user , password:e.target.value})} className='outline-none text-white bg-transparent border-gray-500 rounded-md p-3 w-[90%] mx-auto border-2' placeholder='Password' type="password" />
        <button onClick={onLogin} className='bg-red-700 text-white w-[90%] mx-auto py-2 rounded-sm'>{buttonDisabled ? 'No Login' : 'Login'}</button>
        </div>
        <p className='px-10 py-3'>New to account?<Link href='/signup'  className='cursor-pointer'> Sign up</Link></p>
       </div>
      </div>
    </div>
        </div>
        </>
    )
}