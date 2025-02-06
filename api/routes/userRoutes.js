
const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');  
const userAuthMiddleware = require('../../middleware/userAuthMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/listProduct',userAuthMiddleware, userController.listProduct);
router.get('/viewProduct/:productId',userAuthMiddleware, userController.getProductByid);
router.post('/addToCart',userAuthMiddleware, userController.addToCart);
router.post('/order',userAuthMiddleware, userController.submitOrder)



module.exports = router;  
