const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
            unique:false
        },
        beforPrice:{
            type: Number,
            required: true,
        },
        afterPrice: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        descTeacher: {
            type: String,
            required: false,
        },
        avatar: {
            type: String, 
            required: true
        },
        notes:{
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;