const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getAllCustomers);
router.post('/', customerController.addCustomer);

router.put('/:id', customerController.editCustomer);
router.delete('/:id', customerController.deleteCustomer);


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