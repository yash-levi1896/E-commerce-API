const express=require('express');
const {ProductModel}=require('../Models/product.model');
const { CategoryModel } = require('../Models/category.model');
const productRoute=express.Router();



/**
 * @swagger
 * components:
 *   schemas:
 *     productSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         price:
 *           type: Number
 *         description:
 *           type: string
 *         Availability:
 *           type: Boolean
 *         categoryID:
 *           type: string
 */

/**
 * @swagger
 * /product/addproduct:
 *   post:
 *     tags:
 *       - Product
 *     summary: Add a new product
 *     description: Add a new product with title, price, description, availability, and category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               Availability:
 *                 type: boolean
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added successfully.
 *       400:
 *         description: Bad request. All required fields must be provided.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */


// add product into your database
productRoute.post("/addproduct",async(req,res)=>{
    const {title,price,description,Availability,categoryName}=req.body
    try {
       // Validate that all required fields are present
        if (!title || !price || !description || Availability === undefined || !categoryName) {
          res.status(400).json({ msg: 'All required fields must be provided' });
         }else{

       const data=await CategoryModel.find({name:categoryName});

        // Check if the category exists
         if (data.length === 0) {
          res.status(404).json({ msg: 'Category not found' });
         }else{
         // creating instance with given data through ProductModel
       const newproduct = await new ProductModel({title,price,description,Availability,categoryID:data[0]._id});
       newproduct.save() // saving the product instance into db
       res.status(201).send({msg:"Product added!"})
         }
      }
    } catch (error) {
     
    // Handle other errors
    console.error(error);
    res.status(500).send({ msg: 'Internal Server Error' });
  }
    
})

/**
 * @swagger
 * /product/getproduct/{Id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get products by category
 *     description: Retrieve products based on the provided category ID.
 *     parameters:
 *       - in: path
 *         name: Id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *       400:
 *         description: Bad request. An error occurred while fetching products.
 */


//get product through categoryId

productRoute.get('/getproduct/:Id',async(req,res)=>{
     try {
        let data=await ProductModel.find({categoryID:req.params.Id}) //finding the product into db through id passed into params
        res.status(200).send({msg:data})
     } catch (error) {
        res.status(400).send({msg:error.message});  // capturing error
     }
})

/**
 * @swagger
 * /product/getproductbyid/{productId}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get product details by ID
 *     description: Retrieve detailed information about a specific product based on its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details retrieved successfully.
 *       400:
 *         description: Bad request. An error occurred while fetching product details.
 */

// get product details through productID

productRoute.get('/getproductbyid/:productId',async(req,res)=>{
    const {productId}=req.params  // extracting productId from url params
    try {
       let data=await ProductModel.findOne({_id:productId}) // finding product into db
       res.status(200).send({msg:data})  // sending the response
    } catch (error) {
       res.status(400).send({msg:error.message}); // capturing the server error
    }
})

/**
 * @swagger
 * /product/getproduct:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get all products
 *     description: Retrieve a list of all products available in the database.
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *       400:
 *         description: Bad request. An error occurred while fetching products.
 */

// get all the product that are present in the database.

productRoute.get('/getproduct',async(req,res)=>{
    
    try {
       let data=await ProductModel.find() // finding all the product in the db
       res.status(200).send({msg:data})   // sending response
    } catch (error) {
       res.status(400).send({msg:error.message});  // capturing the error
    }
})


module.exports={productRoute}