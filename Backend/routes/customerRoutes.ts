import express from 'express';
import verifyToken from '../middlewares/authMiddleware';
import { customerSignup, customerLogin, addCartItem, fetchAllCartItem,  deleteCartItem } from '../controllers/customerController';

const router = express.Router();

router.post("/customersignup", customerSignup)
router.post('/customerlogin', customerLogin)
router.post('/addproducttocart', verifyToken, addCartItem)
router.get('/fetchcartitem', verifyToken, fetchAllCartItem)
router.delete('/deletecartitem', verifyToken, deleteCartItem)

export default router