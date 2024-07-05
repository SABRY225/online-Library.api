const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            enum: ['User', 'Admin', 'Store'],
            default: 'User'
        },
        permissions: {
            type: Number,
            required: true,
            default: 1
        },
        type: {
            type: String,
            required: false,
            enum: ['library', 'Academy', 'Book store'],
        },
        name: {
            type: String,
            required: true,
            unique: false
        },
        phone: {
            type: String,
            required: true,
        },
        governorate: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        startDate: {
            type: String,
            required: false,
        },
        Duration: {
            type: Number,
            required: false,
        },
        endDate: {
            type: String,
            required: false,
        },
        deliveryservice: {
            type: String,
            required: false,
            enum: ['available', 'Unavailable'],
        },
        verified: {
            type: Boolean,
        }
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
