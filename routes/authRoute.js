const express = require('express');
const router = express.Router();
const {register,login, forgetPassword} =require('../controllers/authController');
const {verifyOTP,sendOTP} = require('../controllers/otpController.js');

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 */

router.post('/login',login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               type:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
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

 *     responses:
 *       200:
 *         description: Registered successfully
 */

router.post('/register',register);

/**
 * @swagger
 * /api/auth/forget-password:
 *   post:
 *     summary: Request to reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 */

router.post('/forget-password',forgetPassword);
/**
 * @swagger
 * tags:
 *   name: Auth
 */
/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post('/send-otp', sendOTP);
/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP for registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */
router.post('/verify-otp',verifyOTP);

module.exports = router;





