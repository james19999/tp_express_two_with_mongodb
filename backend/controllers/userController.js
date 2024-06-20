const asyncHandler= require('express-async-handler');
const User= require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = asyncHandler( async (req,res)=>{
  const {name,email ,password}=req.body;
  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please add all fields')
  }
   const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error('User already exist');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({message:'user register',
           _id:user.id,
           name:user.name,
           email:user.email,
           token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

});
const loginUser = asyncHandler( async (req,res)=>{
 const {email ,password}=req.body;
 if(!email || !password){
    res.status(400)
    throw new Error('Please add all fields')
 }
 const user = await User.findOne({email});
 if(user && (await bcrypt.compare(password,user.password))){
    res.status(201).json({message:'user login',
        _id:user.id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
     })  
 }else{
    res.status(400)
    throw new Error('Invalid user data')  
 }
});
//PRIVATE ROUTE 
const getUser = asyncHandler( async (req,res)=>{
   const {_id,name,email}=await User.findById(req.user.id) ;
   res.status(200).json({
    id:_id,
    name:name,
    email:email
   })
});
const generateToken =(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}








module.exports={
    createUser,
    loginUser,
    getUser
}
