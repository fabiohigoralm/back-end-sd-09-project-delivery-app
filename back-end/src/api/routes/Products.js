const express = require('express');
const { getAllP, getPById } = require('../controllers/Products');
const { jtwValidate } = require('../middlewares/jwtValidation');

const router = express.Router();

router.get('/customer/products', jtwValidate, getAllP);
router.get('/customer/products:id', jtwValidate, getPById);

module.exports = router;