const User = require('../Models/userModel'); 
const Order = require('../Models/orderModel'); 

const numberUser = async (req, res, next) => {
    try {
        const numberOfUsers = await User.countDocuments({ role: "User" }); 
        res.status(200).json({
            message: 'Number of Users fetched successfully',
            numberOfUsers
        });
    } catch (err) {
        console.error('Error fetching number of Users:', err);
        next(err);
    }
}
const numberStory = async (req, res, next) => {
    try {
        const numberOfStores = await User.countDocuments({ role: "Store" }); 
        res.status(200).json({
            message: 'Number of Stors fetched successfully',
            numberOfStores
        });
    } catch (err) {
        console.error('Error fetching number of Stors:', err);
        next(err);
    }
}
const numberOrder = async (req, res, next) => {
    try {
        const numberOfOrders = await Order.countDocuments(); 
        res.status(200).json({
            message: 'Number of Orders fetched successfully',
            numberOfOrders
        });
    } catch (err) {
        console.error('Error fetching number of orders:', err);
        next(err);
    }
}

module.exports = {
    numberUser,
    numberStory,
    numberOrder
};
