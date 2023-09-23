const express=require('express');
const {CategoryModel}=require('../Models/category.model')
const categoryRoute=express.Router();

// add category
categoryRoute.post('/addcategory',async(req,res)=>{
    try {
        // Check if the "name" field is present in the request body
      if (!req.body.name) {
          res.status(400).send({ msg: 'Name field is required' });
      }else{
        // creating new category
        const newcategory = await CategoryModel(req.body);

        // saving instance into the db.
        newcategory.save()

        // sending the response
        res.status(201).send({msg:"category added!"})
      }
     } catch (error) {

        res.status(500).send({msg:error.message}); // capturing the error
     }
})

// get all category
categoryRoute.get('/getcategory',async(req,res)=>{
   try {
      // get the all category 
      const data=await CategoryModel.find()

      // send response
      res.status(200).send({msg:data})
   } catch (error) { 
      res.status(500).send({msg:error.message}) // capturing the error
   }
})

module.exports={categoryRoute}