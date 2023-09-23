const express=require('express');
const {CategoryModel}=require('../Models/category.model')
const categoryRoute=express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     categorySchema:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the category.
 *         name:
 *           type: string
 *           description: The name of the category.
 */

/**
 * @swagger
 * /category/addcategory:
 *   post:
 *     tags:
 *       - Category
 *     summary: Add a new category
 *     description: Create a new category with a name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category added successfully.
 *       400:
 *         description: Bad request. Name field is required.
 *       500:
 *         description: Internal server error.
 */

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

/**
 * @swagger
 * /category/getcategory:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories
 *     description: Retrieve a list of all categories.
 *     responses:
 *       200:
 *         description: Categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error.
 */

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