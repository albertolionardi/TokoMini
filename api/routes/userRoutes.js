
const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');  

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/listProduct', userController.listProduct);
router.get('/viewProduct/:productId', userController.getProductByid);
router.post('/addToCart', userController.addToCart);
router.post('/order', userController.submitOrder)



module.exports = router;  
