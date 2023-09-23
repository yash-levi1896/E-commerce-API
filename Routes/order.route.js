const express=require('express');
const { OrderModel } = require('../Models/order.model');
const { CartModel } = require('../Models/cart.model');
const orderRoute=express.Router();


orderRoute.post("/placeorder",async(req,res)=>{
     try{
    const cart=await CartModel.find({userID:req.body.userID});
    if(cart.length===0){
        res.status(200).send({msg:"cart is empty.Add item to the cart before placing the order!"})
    }else{
        const totalPrice = cart.reduce((total, item) => {
            return total + item.price * item.quantity;
          }, 0);
        let neworder=  new OrderModel({
            userId:req.body.userID,
            products:cart.map((item)=>({
                name:item.name,
                price:item.price,
                quantity:item.quantity
            })),
            totalAmount:totalPrice
        })
        await neworder.save();
        await CartModel.deleteMany({userID:req.body.userID})
        res.status(201).send({msg:"order placed !"})
    }
   }catch(error){
        res.status(500).send({msg:error.message})
   }
})

orderRoute.get("/orderhistory",async(req,res)=>{
    try {
        let data=await OrderModel.find({userId:req.body.userID});
        if(data.length===0){
            res.status(200).send({msg:"No order placed!"})
        }else{
            res.status(200).send({msg:data})
        }
        
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

orderRoute.get("/orderdetail/:orderid",async(req,res)=>{
    try {
        let data=await OrderModel.find({_id:req.params.orderid});
        res.status(200).send({msg:data})
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})





module.exports={orderRoute}