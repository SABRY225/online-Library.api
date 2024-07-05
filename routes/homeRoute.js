const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { numberUser, numberStory, numberOrder } = require('../controllers/homeController');

/**
 * @swagger
 * tags:
 *   name: Landing
 */

/**
 * @swagger
 * /api/landing/number-user:
 *   get:
 *     summary: Get number of users
 *     tags: [Landing]
 *     responses:
 *       200:
 *         description: Retrieved number of users successfully
 */

router.get('/number-user',numberUser);

/**
 * @swagger
 * /api/landing/number-story:
 *   get:
 *     summary: Get number of stories
 *     tags: [Landing]
 *     responses:
 *       200:
 *         description: Retrieved number of stories successfully
 */

router.get('/number-story',numberStory);

/**
 * @swagger
 * /api/landing/number-order:
 *   get:
 *     summary: Get number of orders
 *     tags: [Landing]
 *     responses:
 *       200:
 *         description: Retrieved number of orders successfully
 */

router.get('/number-order',numberOrder);

module.exports = router;
