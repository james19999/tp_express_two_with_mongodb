const mongoose=require('mongoose');

const ResetModel=mongoose.Schema({
     code:{
        type:Number,
        required:true,
        unique:true,
     },
     createdAt: {
        type: Date,
        default: Date.now,
        expires: '10m' // Optional: Automatically delete after 10 minutes
    }
},
{
    timestamps:true
}
);
module.exports=mongoose.model('Reset',ResetModel);