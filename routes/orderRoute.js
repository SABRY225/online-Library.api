const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { getOrdersByAdmin, getOrdersByUser, getOrdersByStore, getOrder, deleteOrder, editOrder, createOrder } = require('../controllers/orderController');


/**
 * @swagger
 * tags:
 *   name: Order
 */

/**
 * @swagger
 * /api/order/create-order/{productID}:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
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
 *               FilePrint:
 *                 type: string
 *               descrabation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order created successfully
 */

router.post('/create-order/:productID',isAuth,createOrder);

/**
 * @swagger
 * /api/order/edite-order/{orderID}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderID
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
 *               FilePrint:
 *                 type: string
 *               descrabation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 */

router.put('/edite-order/:orderID', isAuth,editOrder);

/**
 * @swagger
 * /api/order/delete-order/{orderID}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */

router.delete('/delete-order/:orderID', isAuth, deleteOrder);

/**
 * @swagger
 * /api/order/{orderID}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved order successfully
 */

router.get('/:orderID', isAuth,getOrder);

/**
 * @swagger
 * /api/order/allOrdersByStore/{productID}:
 *   get:
 *     summary: Get all orders for a store
 *     tags: [Order]
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
 *         description: Retrieved all orders for store successfully
 */

router.get('/allOrdersByStore/:productID', isAuth,getOrdersByStore );

/**
 * @swagger
 * /api/order/allOrdersByUser/{UserID}:
 *   get:
 *     summary: Get all orders by a user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: UserID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved all orders by user successfully
 */

router.get('/allOrdersByUser/:UserID', isAuth, getOrdersByUser);



module.exports = router;
