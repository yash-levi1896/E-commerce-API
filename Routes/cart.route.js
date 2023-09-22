const express=require('express');
const {CartModel}=require('../Models/cart.model');
const { ProductModel } = require('../Models/product.model');
const cartRoute=express.Router();


cartRoute.post("/addtocart/:productId",async(req,res)=>{
    const {productId} = req.params
    try {
        const data = await ProductModel.findOne({_id:productId});
        const {title,Availability,price}=data
        if(Availability==false){
            res.status(400).send({msg:"product is not available"})
        }else{
            const trial = await CartModel.find({productID:productId,userID:req.body.userID});
            if(trial.length==0){
                let cart = await new CartModel({name:title,price:price,quantity:1,userID:req.body.userID,productID:productId})
                cart.save()
                res.status(201).send({msg:"product is added to the cart !"});
            }else{
                res.status(200).send({msg:"product is already into the cart !"});
            }
        }
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

cartRoute.get("/getcartitem",async(req,res)=>{
    try {
        let data=await CartModel.find({userID:req.body.userID});
        if(data.length===0){
            res.status(200).send({msg:"your cart is empty please add items!"})
        }else{
            res.status(200).send({msg:data})
        }
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

cartRoute.patch("/increasequantity/:itemid",async(req,res)=>{
    try {
        let data = await CartModel.find({_id:req.params.itemid,userID:req.body.userID});
            data[0].quantity++;
            data[0].save();
            res.status(201).send({msg:"quantity value increases by one"})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({msg:error.message})
    }
})

cartRoute.patch("/decreasequantity/:itemid",async(req,res)=>{
    try {
        let data = await CartModel.find({_id:req.params.itemid,userID:req.body.userID});
          
           if(data[0].quantity>1){
            data[0].quantity--;
             data[0].save();
            res.status(201).send({msg:"quantity value decrease by one"})
           }
           else{
            res.status(400).send({msg:"quantity can't be less than one"})
           }
               
    } catch (error) {
        console.log(error.message)
        res.status(500).send({msg:error.message})
    }
})

cartRoute.delete("/removeitem/:itemid",async(req,res)=>{
    try {
         await CartModel.deleteOne({_id:req.params.itemid,userID:req.body.userID});
        
        res.status(401).send({msg:"item deleted!"})
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

module.exports={cartRoute}