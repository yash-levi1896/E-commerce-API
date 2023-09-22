const express=require('express');
const {CategoryModel}=require('../Models/category.model')
const categoryRoute=express.Router();


categoryRoute.post('/addcategory',async(req,res)=>{
    try {
        await CategoryModel.insertMany(req.body);
        res.status(200).send({msg:"category added!"})
     } catch (error) {
        console.log(error);
        res.status(400).send({msg:error.message});
     }
})

categoryRoute.get('/getcategory',async(req,res)=>{
   try {
      const data=await CategoryModel.find()
      res.status(200).send({msg:data})
   } catch (error) {
      res.status(500).send({msg:error.message})
   }
})

module.exports={categoryRoute}