"use client"
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import {toast} from 'react-hot-toast'
import { on } from 'events';



export default function SignUp(){
    const router = useRouter();
    const [buttonDisabled , setButtonDisabled] = React.useState(false)
    const [user , setUser] = React.useState({
        username:"",
        email:"",
        password:"",
    })

    const onSignUp = async()=>{
    try{
     const response = await axios.post("/api/users/signup" , user)
     console.log("Signup success" , response.data)
     alert("Signup success");
     router.push("/login")
    }catch(error : any){

    console.log(error);
    alert("Failed to signup");

    toast.error(error.message)
    }finally{

    }
    }

    useEffect(()=>{
    if(user.password.length>0 &&user.username.length>0 && user.email.length>0 ){
     setButtonDisabled(false)
     console.log("user enabled")
    }else{
        setButtonDisabled(true);
    }
    },[user])
    
    return (
        <>
        <div>
      
      <div className='absolute top-0 left-0 bg-black/50 w-full h-screen'>
       {/* card */}
       <div className='bg-black/70 border-white border-2 mt-5 text-white w-[95%] md:w-[60%] lg:w-[37%] mx-auto p-10 '>
        <h1 className='text-[2rem] font-bold px-5'>Sign up</h1>
        <div className='flex flex-col gap-4'>
        <input
        id='username'
        value={user.username}
        onChange={(e)=>setUser({...user , username: e.target.value})}         
        className='outline-none mt-3 text-white bg-transparent border-gray-500 rounded-md p-3 w-[90%] mx-auto border-2' placeholder='Name' type="text" />
        <input id='email'
        value={user.email}
        onChange={(e)=>setUser({...user , email:e.target.value})} className='outline-none text-white bg-transparent border-gray-500 rounded-md p-3 w-[90%] mx-auto border-2'placeholder='Eamil' type="text" />
        <input id='password' 
        value={user.password}
        onChange={(e)=>setUser({...user , password:e.target.value})}
        className='outline-none text-white bg-transparent border-gray-500 rounded-md p-3 w-[90%] mx-auto border-2' placeholder='Password' type="password" />
        <button onClick={onSignUp} className='bg-red-700 text-white w-[90%] mx-auto py-2 rounded-sm'>{buttonDisabled ? "No sign up" : "Sign up"}</button>
        </div>
        <p className='px-10 py-3'>Already have an account?<Link href='/login' className='cursor-pointer'> Login</Link></p>
       </div>
      </div>
    </div>
        </>
    )
}