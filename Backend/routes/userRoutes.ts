import express from 'express';
import { userLogin, addProduct, fetchAllProducts, editProduct,  deleteProduct, fetchAllCustomer } from '../controllers/userController'
import upload from '../utils/uploadImage';
import verifyToken from '../middlewares/authMiddleware';
import allowRoles from '../middlewares/rbacMiddleware';

const router = express.Router();

router.post('/userlogin', userLogin)
router.post('/addproduct',verifyToken,allowRoles('superadmin', 'admin'),upload.single('image'), addProduct)
router.get('/fetchproducts', fetchAllProducts)
router.post("/editproduct",verifyToken,allowRoles('superadmin', 'admin'),upload.single('image'),editProduct)
router.delete('/deleteproduct',verifyToken,allowRoles('superadmin'), deleteProduct)
router.get('/fetchallcustomer', verifyToken,allowRoles('superadmin', 'admin'), fetchAllCustomer)

export default router
