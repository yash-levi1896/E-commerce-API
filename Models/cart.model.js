const mongoose=require('mongoose');

const cartSchema=mongoose.Schema({
    name:String,
    price:Number,
    quantity:Number,
    userID:String,
    productID:String
})

const CartModel=mongoose.model("cart",cartSchema)

module.exports={CartModel}