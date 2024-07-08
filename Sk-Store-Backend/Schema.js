const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

const Product = mongoose.model('Product', productSchema);

const userSchema= new mongoose.Schema({
    name:{
     type:String
    },
    email:{
     type:String,
     unique:true
    },
    password:{
     type:String,
    },
    cartData:{
     type:Object,
    },
    date:{
    type:Date,
    default:Date.now()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { Product, User };
