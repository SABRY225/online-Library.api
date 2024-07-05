const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { createComment, editComment, deleteComment, getAllComment } = require('../controllers/commentController');

/**
 * @swagger
 * tags:
 *   name: Comment
 */

/**
 * @swagger
 * /api/comment/create-comment/{productID}:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment created successfully
 */

router.post('/create-comment/:productID', isAuth, createComment);

/**
 * @swagger
 * /api/comment/edite-comment/{commentID}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 */

router.put('/edite-comment/:commentID', isAuth, editComment);

/**
 * @swagger
 * /api/comment/delete-comment/{commentID}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */

router.delete('/delete-comment/:commentID', isAuth, deleteComment);

/**
 * @swagger
 * /api/comment/allComment/{productID}:
 *   get:
 *     summary: Get all comments for a store
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved all comments successfully
 */

router.get('/allComment/:productID', isAuth,getAllComment);


module.exports = router;
