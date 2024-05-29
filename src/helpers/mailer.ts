import nodemailer from 'nodemailer';
import User from '@/models/useModels';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email , emailType , userId}:any)=>{  
try {
    //create a hashed token
    //userId is to find the user

    const hashedToken = await bcryptjs.hash(userId.toString() , 10);

   //what type of email is sent
   if(emailType === 'VERIFY'){
    await User.findByIdAndUpdate(userId , {
        verifyToken: hashedToken , verifyTokenExpiry : Date.now() +3600000
    })
   }else if(emailType === "RESET"){
    await User.findByIdAndUpdate(userId , {
        forgotPasswordToken: hashedToken , forgotPasswordTokenExpiry : Date.now() +3600000
    })
   }

   var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6649d0d8c7a2ce",
      pass: "1c98f8ed9c0b5a"

      //TODO : add credentials here
    }
  });

  const mailOptions ={
    from : 'adityasmjain@gmail.com',
    to: email,
    subject : emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
  }

  const mailResponse = await transport.sendMail(mailOptions)

  return mailResponse;

} catch (error:any) {
    throw new Error(error.message)
}
}

