const express = require('express');
const router = express.Router();
const salesService = require('../controllers/salesService');


router.get('/', salesService.getAllSales);
router.post('/', salesSerice.addSale);

router.put('/:id', salesService.editSale);
router.delete('/:id', salesService.deleteSale);


module.exports = router;