const asyncHandler= require('express-async-handler');
const Goal =require('../models/goalModel');
const User =require('../models/userModel');

const getGoal = asyncHandler (async (req,res)=>{
    //Avoir goal of user
    const goals = await Goal.find({user:req.user.id});
    //All goal
    // const goals=await Goal.find();
    res.status(200).json(goals);
 
});

const createGoal = asyncHandler( async (req,res)=>{
 
  if(!req.body.text){
    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal=await Goal.create({
    text:req.body.text,
    user:req.user.id
  })
  res.status(201).json(goal);
});

const updateGoal = asyncHandler ( async (req,res)=>{
    const goal=await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error('The goal is not found')
    }else{
        const user= await User.findById(req.user.id);
        if(!user){
            res.status(401);
            throw new Error('User not found');
        }
         if(goal.user.toString() !== user.id){
            res.status(401);
            throw new Error('Not authorized');
         }

      const updateGoal =await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true});
      res.status(200).json(updateGoal);
    }
});

const deleteGoal = asyncHandler ( async (req,res)=>{
  const goal =await Goal.findById(req.params.id);
  if(!goal){
    res.status(400);
    throw new Error('The goal is not found')
  }
  await Goal.deleteOne({ _id: req.params.id });
  res.status(200).json({id:req.params.id});
});

module.exports={
    getGoal,
    createGoal,
    updateGoal,
    deleteGoal,

}