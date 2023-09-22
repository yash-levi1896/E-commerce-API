const express=require('express');
const {ProductModel}=require('../Models/product.model');
const { CategoryModel } = require('../Models/category.model');
const productRoute=express.Router();

productRoute.post("/addproduct",async(req,res)=>{
    const [{title,price,description,Availability,category}]=req.body
    try {
       const data=await CategoryModel.find({name:category});
       await ProductModel.insertMany([{title,price,description,Availability,categoryID:data[0]._id}]);
       res.status(201).send({msg:"Product added!"})
    } catch (error) {
       console.log(error);
       res.status(400).send({msg:error.message});
    }
})

productRoute.get('/getproduct/:Id',async(req,res)=>{
     try {
        let data=await ProductModel.find({categoryID:req.params.Id})
        res.status(201).send({msg:data})
     } catch (error) {
        res.status(400).send({msg:error.message});
     }
})

productRoute.get('/getproductbyid/:productId',async(req,res)=>{
    const {productId}=req.params
    try {
       let data=await ProductModel.findOne({_id:productId})
       res.status(201).send({msg:data})
    } catch (error) {
       res.status(400).send({msg:error.message});
    }
})
productRoute.get('/getproduct',async(req,res)=>{
    
    try {
       let data=await ProductModel.find()
       res.status(201).send({msg:data})
    } catch (error) {
       res.status(400).send({msg:error.message});
    }
})


module.exports={productRoute}