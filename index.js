const express=require('express');
const  connection  = require('./config/db');
const {userRoute}=require('./Routes/user.route');
const { categoryRoute } = require('./Routes/category.route');
require('dotenv').config()
const app=express()

app.use(express.json())


app.get('/',(req,res)=>{
    res.status(200).send("hello")
})
app.use("/user",userRoute);
app.use("/category",categoryRoute);



app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running")
})