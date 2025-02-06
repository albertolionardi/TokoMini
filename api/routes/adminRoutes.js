
const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');  
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/login', adminController.login);
router.post('/createproduct', authMiddleware, adminController.createProduct);
router.get('/viewProducts', authMiddleware, adminController.readProducts);
router.put('/updateProduct/:productId', authMiddleware, adminController.updateProduct);
router.delete('/deleteProduct/:productId', authMiddleware, adminController.deleteProduct);
router.get('/getUsers', authMiddleware, adminController.readUsers)




module.exports = router;  
