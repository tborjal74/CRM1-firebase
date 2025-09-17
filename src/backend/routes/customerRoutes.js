const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getAllCustomers);
router.post('/', customerController.addCustomer);


/** Swagger Documentation
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: Success
 */

module.exports = router;