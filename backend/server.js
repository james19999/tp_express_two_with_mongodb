const express =require('express')
const dotenv=require('dotenv').config()
const GoalRouter=require('./routes/goalRouter')
const UserRouter=require('./routes/userRouter')
const {errorHandler}=require('./middleware/errorMiddleware')
const connectDB =require('./config/db');
const port=process.env.PORT || 5000

connectDB()

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', GoalRouter);
app.use('/api/users', UserRouter);
app.use(errorHandler)
app.listen(port,()=>console.log(`server start with ${port}`))