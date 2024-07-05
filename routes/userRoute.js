const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { getUser, editUser } = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: User
 */

/**
 * @swagger
 * /api/user/CurrentUser:
 *   get:
 *     summary: Get current user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieved current user information successfully
 */

router.get('/CurrentUser', isAuth, getUser);

/**
 * @swagger
 * /api/user/edite-info/{userID}:
 *   put:
 *     summary: Edit user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               governorate:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               avatar:
 *                 type: string
 *               deliveryservice:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 */

router.put('/edite-info/:userID', isAuth,editUser);

module.exports = router;
