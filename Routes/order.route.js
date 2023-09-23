const express=require('express');
const { OrderModel } = require('../Models/order.model');
const { CartModel } = require('../Models/cart.model');
const orderRoute=express.Router();

/** 
 * @swagger
*components:
*  schemas:
*    orderSchema:
*      type: object
*      properties:
*        userId:
*          type: string
*        products:
*          type: array
*          items:
*            type: object
*            properties:
*              name:
*                type: string
*              price:
*                type: number
*              quantity:
*                type: integer
*        totalAmount:
*          type: number
*      example:
*        userId: "1234567890"
*        products:
*          - name: "Product 1"
*            price: 10.99
*            quantity: 2
*          - name: "Product 2"
*            price: 15.99
*            quantity: 1
*        totalAmount: 37.97
*/

/**
 * @swagger
 * /order/placeorder:
 *   post:
 *     tags:
 *       - Order
 *     summary: Place an order
 *     description: Place an order with products from the user's cart.
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
 *         description: Order placed successfully.
 *       200:
 *         description: Cart is empty. Add items to the cart before placing an order.
 *       500:
 *         description: Internal server error.
 */



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


/**
 * @swagger
 * /order/orderhistory:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get order history
 *     description: Retrieve the order history for an authenticated user.
 *     responses:
 *       200:
 *         description: Order history retrieved successfully.
 *       204:
 *         description: No order placed.
 *       500:
 *         description: Internal server error.
 */


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

/**
 * @swagger
 * /order/orderdetail/{orderid}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get order details by ID
 *     description: Retrieve detailed information about a specific order based on its ID.
 *     parameters:
 *       - in: path
 *         name: orderid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details retrieved successfully.
 *       500:
 *         description: Internal server error.
 */

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