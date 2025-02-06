
const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const userAuthMiddleware = require('../../middleware/userAuthMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/listProducts', userAuthMiddleware, userController.listProducts);
router.get('/viewProduct/:productId', userAuthMiddleware, userController.getProductByid);
router.post('/addToCart', userAuthMiddleware, userController.addToCart);
router.post('/submitOrder', userAuthMiddleware, userController.submitOrder)



module.exports = router;  
