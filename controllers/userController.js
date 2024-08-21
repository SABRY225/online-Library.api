const User = require("../models/userModel");

const getUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId)
        if (!user) {
            const err = new Error('Can\'t find user');
            err.statusCode = 404;
            throw err;
        }
        //create user data
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            governorate: user.governorate,
            city: user.city,
            address: user.address,
            avatar: user.avatar,
            deliveryservice: user.deliveryservice,
            startDate: user.startDate,
            endDate: user.endDate,
            type:user.type
        }

        res.status(200).json({
            success: true,
            user: userData
        });
    } catch (err) {
        console.error('Error in get this User:', err);
        next(err);
    }
}
const editUser = async (req, res, next) => {
    try {
        const userId = req.params.userID;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        if (userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'You are not authorized to edit this product' });
        }
            user.name = req.body.name;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.governorate = req.body.governorate;
            user.city = req.body.city;
            user.address = req.body.address;
            user.avatar = req.body.avatar;
            user.deliveryservice = req.body.deliveryservice;
        await user.save();
        res.status(200).json({ message: 'The User has been successfully updated', data: user });
    } catch (err) {
        console.error('Error updating User :', err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

module.exports = {
    getUser,
    editUser
};
