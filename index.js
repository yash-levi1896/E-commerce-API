const express=require('express');
const  connection  = require('./config/db');
const cookieParser=require('cookie-parser')
const {userRoute}=require('./Routes/user.route');
const { categoryRoute } = require('./Routes/category.route');
const { productRoute } = require('./Routes/product.route');
const {authentication} = require('./Middleware/authentication');
const { cartRoute } = require('./Routes/cart.route');
const { orderRoute } = require('./Routes/order.route');
const swaggerUI = require("swagger-ui-express");
const swaggerJSdoc=require("swagger-jsdoc")

require('dotenv').config()
const app=express()

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("This is Home Page for E-Commerce application")
})

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"E-commerce API",
            version:"1.0.0"
        },
        servers:[
            {
                url: `http://localhost:${process.env.PORT}`,
                description: "Local development server",
              },
              {
                url: "https://companyassignment-83od.onrender.com",
                description: "Deployed server",
              },
        ]
    },
    apis:["./Routes/*.js"]
}

const swaggerSpec = swaggerJSdoc(options)
app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerSpec))



app.use("/user",userRoute);
app.use("/category",categoryRoute);
app.use("/product",productRoute);

app.use(authentication);

app.use("/cart",cartRoute)
app.use("/order",orderRoute)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running")
})