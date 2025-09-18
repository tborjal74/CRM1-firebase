const express = require('express');
const router = express.Router();
const salesService = require('../controllers/salesService');
const authenticate = require('../middleware/auth');


router.get('/', authenticate, salesService.getAllSales);
router.post('/', authenticate, salesSerice.addSale);

router.put('/:id', authenticate, salesService.editSale);
router.delete('/:id', authenticate, salesService.deleteSale);


module.exports = router;