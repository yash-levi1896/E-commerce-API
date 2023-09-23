const express=require('express');
const {CartModel}=require('../Models/cart.model');
const { ProductModel } = require('../Models/product.model');
const cartRoute=express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     cartSchema:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the cart item.
 *         name:
 *           type: string
 *           description: The name of the product in the cart.
 *         price:
 *           type: number
 *           format: double
 *           description: The price of the product in the cart.
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the cart.
 *         userID: 
 *           type: string
 *         productID:
 *           type: string
 *       required:
 *         - _id
 *         - name
 *         - price
 *         - quantity
 */

/**
 * @swagger
 * /cart/addtocart/{productId}:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add a product to the cart
 *     description: Add a product to the cart by providing the product ID in the URL.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added to the cart successfully.
 *       200:
 *         description: Product is already in the cart.
 *       404:
 *         description: Product is not available.
 *       500:
 *         description: Internal server error.
 */

// add product to the cart
cartRoute.post("/addtocart/:productId",async(req,res)=>{
    const {productId} = req.params // extracting productId from url params
    try {
        // find the product through productId
        const data = await ProductModel.findOne({_id:productId});

        // destructure the data object 
        const {title,Availability,price}=data

        // if product is not available.
        if(Availability==false){
            res.status(404).send({msg:"product is not available"})
        }else{
            // find the item from cart with productID and userID.
            const trial = await CartModel.find({productID:productId,userID:req.body.userID});

            // if array empty then add the product in the cart
            if(trial.length==0){
                // create new cart instance
                let cart = await new CartModel({name:title,price:price,quantity:1,userID:req.body.userID,productID:productId})

                // save the cart instance in db.
                cart.save()

                // send response
                res.status(201).send({msg:"product is added to the cart !"});
            }else{
                // if array lenth > 0 than product is already in the cart no need to add
                res.status(200).send({msg:"product is already into the cart !"});
            }
        }
    } catch (error) {
        res.status(500).send({msg:error.message})  // capture the error
    }
})

/**
 * @swagger
 * /cart/getcartitem:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Get cart items
 *     description: Retrieve all cart items for an authenticated user.
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully or Your cart is empty. Please add items!
 *       500:
 *         description: Internal server error.
 */

// get all the cart item for the authenticated user
cartRoute.get("/getcartitem",async(req,res)=>{
    try {
        // finding cart item for the authenticated user
        let data=await CartModel.find({userID:req.body.userID});

        // handle the case where no item is in the cart
        if(data.length===0){
            res.status(200).send({msg:"your cart is empty please add items!"})
        }else{
            // sending the response.
            res.status(200).send({msg:data})
        }
    } catch (error) {
        res.status(500).send({msg:error.message})  // capturing the error
    }
})

/**
 * @swagger
 * /cart/increasequantity/{itemid}:
 *   patch:
 *     tags:
 *       - Cart
 *     summary: Increase quantity by one
 *     description: Increase the quantity of an item in the cart by providing the item ID in the URL.
 *     parameters:
 *       - in: path
 *         name: itemid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantity value increased by one.
 *       500:
 *         description: Internal server error.
 */

// increase the quantity by one in the cart
cartRoute.patch("/increasequantity/:itemid",async(req,res)=>{
    try {

        // find the item with itemid(taken from url params) and authenticated user
        let data = await CartModel.find({_id:req.params.itemid,userID:req.body.userID});
            
        // inccrease it's value by one
            data[0].quantity++;

        // save the instance into the db again
            data[0].save();
        
        // send the response
            res.status(200).send({msg:"quantity value increases by one"})
        
    } catch (error) {
      
        res.status(500).send({msg:error.message}) // capture the error
    }
})

/**
 * @swagger
 * /cart/decreasequantity/{itemid}:
 *   patch:
 *     tags:
 *       - Cart
 *     summary: Decrease quantity by one
 *     description: Decrease the quantity of an item in the cart by one, providing the item ID in the URL.
 *     parameters:
 *       - in: path
 *         name: itemid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantity value decreased by one.
 *       422:
 *         description: Quantity can't be less than one.
 *       500:
 *         description: Internal server error.
 */

// decrease the quantity by one in the cart
cartRoute.patch("/decreasequantity/:itemid",async(req,res)=>{
    try {
        // find the item with itemid(taken from url params) and authenticated user
        let data = await CartModel.find({_id:req.params.itemid,userID:req.body.userID});
          
           if(data[0].quantity>1){ // check if the quantity value is greater than 1
            data[0].quantity--;    // decrease the value by 1
             data[0].save();       // save the instance in db
            res.status(200).send({msg:"quantity value decrease by one"}) // send the response
           }
           else{
            // response if the quantity is less than or equal  to one.
            res.status(422).send({msg:"quantity can't be less than one"})
           }
               
    } catch (error) {
        res.status(500).send({msg:error.message})  // capturing the error
    }
})

/**
 * @swagger
 * /cart/removeitem/{itemid}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Remove item from cart
 *     description: Remove an item from the cart by providing the item ID in the URL.
 *     parameters:
 *       - in: path
 *         name: itemid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from the cart.
 *       500:
 *         description: Internal server error.
 */

// remove the item from the cart
cartRoute.delete("/removeitem/:itemid",async(req,res)=>{
    try {

        // find the item through itemid and userID and delete
         await CartModel.deleteOne({_id:req.params.itemid,userID:req.body.userID});
        
        // response if item deleted
        res.status(200).send({msg:"item deleted!"})
    } catch (error) {
        res.status(500).send({msg:error.message}) // capture the error
    }
})

module.exports={cartRoute}