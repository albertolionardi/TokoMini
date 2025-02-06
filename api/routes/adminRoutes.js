
const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuthMiddleware = require('../../middleware/adminAuthMiddleware');

router.post('/login', adminController.login);
router.post('/createproduct', adminAuthMiddleware, adminController.createProduct);
router.get('/viewProducts', adminAuthMiddleware, adminController.readProducts);
router.put('/updateProduct/:productId', adminAuthMiddleware, adminController.updateProduct);
router.delete('/deleteProduct/:productId', adminAuthMiddleware, adminController.deleteProduct);
router.get('/getUsers', adminAuthMiddleware, adminController.readUsers)




module.exports = router;  
