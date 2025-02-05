
const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');  

router.post('/login', adminController.login);
router.post('/createproduct', adminController.createProduct);
router.get('/viewProducts', adminController.readProducts);
router.put('/updateProduct/:productId', adminController.updateProduct);
router.delete('/deleteProduct/:productId', adminController.deleteProduct);
router.get('/getUsers', adminController.readUsers)




module.exports = router;  
