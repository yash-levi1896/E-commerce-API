const express=require('express');
const  connection  = require('./config/db');
const cookieParser=require('cookie-parser')
const {userRoute}=require('./Routes/user.route');
const { categoryRoute } = require('./Routes/category.route');
const { productRoute } = require('./Routes/product.route');
const {authentication} = require('./Middleware/authentication');
const { cartRoute } = require('./Routes/cart.route');
require('dotenv').config()
const app=express()

app.use(express.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.status(200).send("hello")
})
app.use("/user",userRoute);
app.use("/category",categoryRoute);
app.use("/product",productRoute);
app.use(authentication);
app.use("/cart",cartRoute)



app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running")
})