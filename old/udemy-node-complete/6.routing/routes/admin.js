const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:id', adminController.getEditProduct);
router.post('/edit-product/:id', adminController.postEditProduct);
router.get('/delete-product/:id', adminController.getDeleteProduct);
router.post('/delete-product/:id', adminController.postDeleteProduct);
router.get('/products', adminController.getProducts);

module.exports = router;
