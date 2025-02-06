
const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');  
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/listProduct',authMiddleware, userController.listProduct);
router.get('/viewProduct/:productId',authMiddleware, userController.getProductByid);
router.post('/addToCart',authMiddleware, userController.addToCart);
router.post('/order',authMiddleware, userController.submitOrder)



module.exports = router;  
