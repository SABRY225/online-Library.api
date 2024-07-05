const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.models.Comment ||  mongoose.model('Comment', CommentSchema);

module.exports = Comment;