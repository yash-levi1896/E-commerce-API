const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      price:{
        type:Number,
        require:true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
    
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

const OrderModel = mongoose.model('order', orderSchema);

module.exports = {OrderModel};
