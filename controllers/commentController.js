const Comment = require('../models/commentMode');

// Function to create a new comment
const createComment = async (req, res, next) => {
    try {
        const productID = req.params.productID;
        const userID = req.userId; // Assuming req.userId is set by the auth middleware
        const { description } = req.body;

        const newComment = new Comment({
            userID,
            productID,
            description,
        });

        await newComment.save();

        res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (error) {
        next(error);
    }
};

// Function to edit an existing comment
const editComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentID;
        const { description } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(commentId, { description }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
    } catch (error) {
        next(error);
    }
};

// Function to delete a comment
const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentID;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Function to get all comments
const getAllComment = async (req, res, next) => {
    try {
        const productID = req.params.productID;

        const comments = await Comment.find({ productID });

        res.status(200).json({ comments });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createComment,
    editComment,
    deleteComment,
    getAllComment,
};
