

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
 import userRouter from './routes/userRoute.js'
 import productRouter from './routes/productRoute.js'
 import cartRouter from './routes/cartRoute.js'
 import orderRouter from './routes/orderRoute.js'


const app=express()
const port =process.env.PORT ||4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

 app.use('/api/user', userRouter)
 app.use('/api/product', productRouter)
 app.use('/api/cart', cartRouter)
 app.use('/api/order', orderRouter)

//api endpoints
app.get('/',(req,res)=>{
    res.send("API WORKING")
})
app.listen(port,()=>console.log('server started on PORT:'+port))
{/*
    
    import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'


const app=express()
const port =process.env.PORT ||4000
connectDB()


//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.get('/',(req,res)=>{
    res.send("API WORKING")
})
app.listen(port,()=>console.log('server started on PORT:'+port))

import mongoose from "mongoose";
const connectDB = async() =>{
    mongoose.connection.on('connected',()=>{
        console.log("DB connected");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}
export default connectDB; 
"test": "echo \"Error: no test specified\" && exit 1",
*/}