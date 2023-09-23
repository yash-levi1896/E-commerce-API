const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    title:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    Availability:{type:Boolean,required:true},
    categoryID:{type:String,required:true}
},{versionKey:false})

const ProductModel=mongoose.model("product",productSchema);

module.exports={ProductModel}