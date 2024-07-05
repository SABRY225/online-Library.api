const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
    {
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        FilePrint: {
            type: String,
            required: true,
        },
        descrabation: {
            type: String,
            required: true,
        },
    },
);

const Order = mongoose.models.Order ||mongoose.model('Order', OrderSchema);

module.exports = Order;