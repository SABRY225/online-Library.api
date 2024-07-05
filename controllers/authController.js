const User = require('../Models/userModel');
const authService = require('../services/auth');
const hashingService = require('../services/hashing');
const jwt = require('jsonwebtoken');
const OTP = require('../models/otpModel');
const bcrypt = require('bcrypt');
const register = async (req, res, next) => {
    try {
        const {
            role,
            name,
            email,
            password,
            phone,
            governorate,
            city,
            address,
            avatar,
            deliveryservice,
            type,
        } = req.body;

        // Check if email already exists
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Validate password complexity
        const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!%*?&].{8,}$/.test(password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
        }

        const hashedPassword = await hashingService.hashPassword(password);

        // Common user creation logic
        const newUser = new User({
            role,
            name,
            email,
            phone,
            governorate,
            address,
            city,
            avatar,
            password: hashedPassword,
            verified: false,
        });

        // Additional fields based on role
        if (role === 'Store') {
            const currentDate = new Date();
            let Duration = (type === "library") ? 15 : 21;
            currentDate.setDate(currentDate.getDate() + Duration);
            const endDate = currentDate.toISOString().split('T')[0];

            newUser.Duration = Duration;
            newUser.startDate = new Date().toISOString().split('T')[0];
            newUser.endDate = endDate;
            newUser.deliveryservice = deliveryservice || "Unavailable";
            newUser.type = type;
        }

        // Save user to database
        const result = await newUser.save();
        const otp = (100000 + Math.floor(Math.random() * 900000)).toString();
        const newOTP = new OTP({
            email,
            otp
        });
        newOTP.save();
        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Send OTP successfully',
            user: result,
        });

    } catch (err) {
        console.error('Error registering user:', err);
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'This email does not exist' });
        }

        const isMatch = await authService.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        if (user.verified === false) {
            return res.status(404).json({ error: 'not verified' });
        }
        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, '.njjfjfhjslslshfjiaoaosfkpjfjfj', { expiresIn: '1h' });

        let Type = user.type || "";
        let Role = user.role || "";

        res.status(200).json({ Token: token, Type, Role, message: 'Login successful' });

    } catch (err) {
        console.error('Error logging in:', err);
        next(err);
    }
};

const forgetPassword = async (req, res, next) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: 'Please provide email, OTP, and new password.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const otpRecords = await OTP.findOne({ otp }).sort({ createdAt: -1 }).limit(1);
        console.log(otpRecords);
        if (otpRecords === null) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    forgetPassword
};
