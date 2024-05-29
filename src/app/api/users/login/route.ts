import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/useModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try {
       const reqBody = await request.json();
       const {email , password} = reqBody ;
       console.log(reqBody);

       //check if users exists
       const user = await User.findOne({email})

       if(!user){
        return NextResponse.json({error:"User does not exist please signup"} , {status : 400})
       }

       //password
       const validPassword = await bcrypt.compare(password , user.password )
       
       if(!validPassword){
        return NextResponse.json({error:"Password is incorrect"} , {status : 400})
       }

       //create token data
       const tokenData={
        id:user.id,
        username : user.username,
        email : user.email,
       }

       //create a token

       const token= await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {expiresIn :"1d"});  //expires in 1 day //TOKEN_SECRET !-->TOOK ALL THE DATA
       
       const response = NextResponse.json({
        message : "Login is successful",
        success : true,
       })

       response.cookies.set("token" , token , {
        httpOnly : true ,
       })

       return response;
       
    } catch (error:any) {
        return NextResponse.json({error : error.message} , {status :500})
    }
}