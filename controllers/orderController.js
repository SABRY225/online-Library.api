const User = require('../models/clientModel');
const Order = require('../models/orderModel'); 
const Product = require('../models/productModel');

const createOrder = async (req, res, next) => {
    try {
        const productID = req.params.productID;
        const { FilePrint, descrabation } = req.body;
        const userID = req.userId; // Assuming req.userId is set by the auth middleware

        const user = await User.findById(userID);
        const product = await Product.findById(productID);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newOrder = new Order({
            productID,
            userID,
            FilePrint,
            descrabation
        });

        await newOrder.save();
        res.status(201).json({ message: 'Create Order successfully' });
    } catch (error) {
        next(error);
    }
}
// Function to edit an order
const editOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderID;
        const { FilePrint, descrabation } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { FilePrint, descrabation }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        next(error);
    }
};

// Function to delete an order
const deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderID;

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Function to get a single order by ID
const getOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderID;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (error) {
        next(error);
    }
};

// Function to get orders by store
const getOrdersByStore = async (req, res, next) => {
    try {
        const productID = req.params.productID;

        const orders = await Order.find({ productID });

        res.status(200).json({ orders });
    } catch (error) {
        next(error);
    }
};

// Function to get orders by user
const getOrdersByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const orders = await Order.find({ userId });

        res.status(200).json({ orders });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createOrder,
    editOrder,
    deleteOrder,
    getOrder,
    getOrdersByStore,
    getOrdersByUser,
};
