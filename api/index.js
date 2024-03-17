import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to database')
})
.catch((err)=>{
    console.log(err);
});

const app=express();

app.use(express.json());


app.listen(3000, ()=>{
    console.log('Server Listening on port 3000');
});

 
// app.get('/',(req,res)=>{
//     res.json({
//         message:"API is working",
//     });
// });

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes)


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode  || 500;
    const message = err.message||'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,

    })
})