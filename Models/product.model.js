const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    Availability:Boolean,
    categoryID:String
},{versionKey:false})

const ProductModel=mongoose.model("product",productSchema);

module.exports={ProductModel}