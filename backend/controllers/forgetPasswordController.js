const asyncHandler =require('express-async-handler');
const User =require('../models/userModel');
const Reset =require('../models/resetModel');
const {mailConfig} =require('../mails/maildev');

//CHECK IF MAIL EXIST AN SEND CODE
const sendCode = asyncHandler( async (req ,res)=>{
    const {email}=req.body;
    const user = await User.findOne({email});
    if(!email){
        res.status(400).json('field mail require')
        throw Error('field mail require')
    }
    if(user){
        const code= await sendNewCode()
        await  mailConfig(email,'message',code['code'])
        res.status(200).json(`le code de trois   ${code}`)
    }else{
        res.status(404).json('mail not found')
    }
});

const sendNewCode = asyncHandler (async (req ,res)=>{
    const code = await Reset.create({
        code:generateCode(),
    });
    // res.status(200).json({
    //     success:true,
    //     message:'code send'
    // })
    return code
})

//CHECK IF CODE IS CORRECT

const verifyCode = asyncHandler( async (req,res)=>{
   const {code}=req.body;
   const expirationDuration = 10 * 60 * 1000;
   if(!code){
    res.status(400).json('field code require')
    throw Error('field code require')
   }
   const reset = await Reset.findOne({code});
   const now = new Date();
   const createdAt = new Date(reset.createdAt);
   if(reset && (now - createdAt <  expirationDuration) ){
      res.status(200).json({
        message:'code is correct',
        success:true,
      })
    }else{
        await Reset.deleteOne({ code }); // Optionally, remove expired code
        res.status(400);
        throw new Error("Invalid or expired code");

    }

});
//GENERATE CODE 
const generateCode = ()=>{
    return Math.floor(100 + Math.random() * 900);
}

module.exports={
    sendCode,
    verifyCode,
    sendNewCode,
}
