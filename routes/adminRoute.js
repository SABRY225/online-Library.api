const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const { getAllCard, getAllUser, deleteUser, getAllStore,accaptPermisson, denyPermisson, getAllcomments, editeCardPymant, createCardPymant } = require('../controllers/adminController');

/**
 * @swagger
 * tags:
 *   name: Admin
 */

/**
 * @swagger
 * /api/admin/allCard:
 *   get:
 *     summary: Retrieve all cards
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 */

router.get('/allCard', isAuth, getAllCard);
/**
 * @swagger
 * /api/admin/create-cardPymant:
 *   post:
 *     summary: create card payment information
 *     tags: [Admin]
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
 *               OneMon:
 *                 type: string
 *               TwoMon:
 *                 type: string
 *               ThreeMon:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */

router.post('/create-cardPymant', isAuth, createCardPymant);

/**
 * @swagger
 * /api/admin/edite-cardPymant/{cardPymantId}:
 *   put:
 *     summary: Update card payment information
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardPymantId
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

 *               OneMon:
 *                 type: string
 *               TwoMon:
 *                 type: string
 *               ThreeMon:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */

router.put('/edite-cardPymant/:cardPymantId', isAuth, editeCardPymant);

/**
 * @swagger
 * /api/admin/allUser:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 */

router.get('/allUser', isAuth, getAllUser);

/**
 * @swagger
 * /api/admin/delete-User/{UserID}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin]
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
 *         description: Successful operation
 */

router.delete('/delete-User/:UserID', isAuth, deleteUser);

/**
 * @swagger
 * /api/admin/allStore:
 *   get:
 *     summary: Retrieve all stories
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 */

router.get('/allStore', isAuth, getAllStore);


/**
 * @swagger
 * /api/admin/accapt-permisson/{StoreID}:
 *   put:
 *     summary: accapt permissions for a story
 *     tags: [Admin]
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
 *         description: Successful operation
 */

router.put('/accapt-permisson/:StoreID', isAuth, accaptPermisson);

/**
 * @swagger
 * /api/admin/deny-permisson/{StoreID}:
 *   put:
 *     summary: deny permissions for a story
 *     tags: [Admin]
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
 *         description: Successful operation
 */

router.put('/deny-permisson/:StoreID', isAuth, denyPermisson);

/**
 * @swagger
 * /api/admin/allcomments:
 *   get:
 *     summary:  fatch all comments
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 */

router.get('/allcomments/', isAuth, getAllcomments);




module.exports = router;
