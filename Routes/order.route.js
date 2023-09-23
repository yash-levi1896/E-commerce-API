const express=require('express');
const { OrderModel } = require('../Models/order.model');
const { CartModel } = require('../Models/cart.model');
const orderRoute=express.Router();

// palce order 
orderRoute.post("/placeorder",async(req,res)=>{
     try{
    // finding items present in the user cart    
    const cart=await CartModel.find({userID:req.body.userID});

    // handle the case where cart is empty
    if(cart.length===0){
        res.status(200).send({msg:"cart is empty.Add item to the cart before placing the order!"})
    }else{
        // calculate the total price of the cart
        const totalPrice = cart.reduce((total, item) => {
            return total + item.price * item.quantity;
          }, 0);
        
        // create new order
        let neworder=  new OrderModel({
            userId:req.body.userID,
            products:cart.map((item)=>({
                name:item.name,
                price:item.price,
                quantity:item.quantity
            })),
            totalAmount:totalPrice
        })

        // save the new order instance into the db.
        await neworder.save();

        // clear the cart whose order are placed.
        await CartModel.deleteMany({userID:req.body.userID})

        // sending the response.
        res.status(201).send({msg:"order placed !"})
    }
   }catch(error){
        res.status(500).send({msg:error.message}) // capturing the error
   }
})


// orderhistory for authenticated user

orderRoute.get("/orderhistory",async(req,res)=>{
    try {
        // find the orders for the authenticated user.
        let data=await OrderModel.find({userId:req.body.userID});

        // handle the case where no order is placed
        if(data.length===0){
            res.status(200).send({msg:"No order placed!"})
        }else{
            res.status(200).send({msg:data}) // sending the response message
        }
        
    } catch (error) {
        res.status(500).send({msg:error.message}) // capturing the error
    }
})

// orderdetail through orderid

orderRoute.get("/orderdetail/:orderid",async(req,res)=>{
    try {
        // filter the orders based on orderid through url params
        let data=await OrderModel.find({_id:req.params.orderid});

        // sending the response
        res.status(200).send({msg:data})

    } catch (error) {
        res.status(500).send({msg:error.message}) // capturing the error
    }
})





module.exports={orderRoute}