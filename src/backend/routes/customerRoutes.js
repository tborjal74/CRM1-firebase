const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authenticate = require('../middleware/auth');


router.get('/', authenticate, customerController.getAllCustomers);
router.post('/', authenticate, customerController.addCustomer);
router.put('/:id', authenticate, customerController.editCustomer);
router.delete('/:id', authenticate, customerController.deleteCustomer);

module.exports = router;


/** Swagger Documentation
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: Success
 */
