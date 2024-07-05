const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { createProduct, editProduct, deleteProduct, getProduct, ProductsStore } = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Product
 */

/**
 * @swagger
 * /api/product/create-product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               name:
 *                 type: string
 *               beforPrice:
 *                 type: number
 *               afterPrice:
 *                 type: number
 *               description:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product created successfully
 */

router.post('/create-product', isAuth, createProduct);

/**
 * @swagger
 * /api/product/edite-product/{productID}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
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
 *               type:
 *                 type: string
 *               name:
 *                 type: string
 *               beforPrice:
 *                 type: number
 *               afterPrice:
 *                 type: number
 *               description:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

router.put('/edite-product/:productID', isAuth, editProduct);

/**
 * @swagger
 * /api/product/delete-product/{productID}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
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
 *         description: Product deleted successfully
 */

router.delete('/delete-product/:productID', isAuth, deleteProduct);

/**
 * @swagger
 * /api/product/{productID}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
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
 *         description: Retrieved product successfully
 */

router.get('/:productID', isAuth, getProduct );

/**
 * @swagger
 * /api/product/allProducts/{StoreID}:
 *   get:
 *     summary: Get all products for a store
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: StoreID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved all products for store successfully
 */

router.get('/allProducts/:StoreID', isAuth, ProductsStore);

module.exports = router;
