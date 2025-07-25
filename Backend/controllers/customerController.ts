import { Request, Response } from 'express';
import Customer from '../dbSchema/customer';
import customerHelpers from '../helpers/customerHelpers';
import generateToken from '../utils/generateToken';

interface User {
    id: number;
    email: string;
    role: string;
    name?: string;
  }

  interface CartItemPayload {
    userId: number;
    productId: number;
    name: string;
    price: string;
    stock: string;
    description?: string;
    image?: string;
    imageUrl?: string;
  }

export const customerSignup = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { name, number, email, password } = req.body;

        const checkSignup = await customerHelpers.customenSignup(req.body)
        
        if(checkSignup?.status) {
            res.status(200).json({ status: checkSignup?.status, message: checkSignup?.message })
        }

    } catch(error) {
        console.error(error);
    }
}

export const customerLogin = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
        }
        
        const customerAuth = await customerHelpers.customerLogin(req.body)

        if(customerAuth?.status) {
           const token = generateToken(customerAuth?.payload as User)
           res.status(200).json({ status: true, message: customerAuth?.message, token: token });
        } else {
            res.status(200).json({ status: false, message: customerAuth?.message })
        }
        
    } catch(error) {
        console.error(error);
    }
}

export const addCartItem = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { userId, product } = req.body;
        const { id, name, price, stock, description, image, imageUrl } = product;

        if (!userId || !product || !product.id) {
            return res.status(400).json({ status: false, message: 'Missing userId or product details' });
          }

        const payload = {
            userId: userId,
            productId: id,
            name: name,
            price: price,
            stock: stock,
            description: description,
            image: image,
            imageUrl: imageUrl
        }

        const newCartItem = await customerHelpers.addProductToCart(payload)

        if(newCartItem?.status) {
            res.status(200).json({ status: true, message: newCartItem?.message})
        }

    } catch(error) {
        res.status(200).json({ status: true, message: "internal error" })
    }
}

export const fetchAllCartItem = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { customerid } = req.query  
                
        if (!customerid || typeof customerid !== 'string') {
            return res.status(400).json({ status: false, message: "User ID is required and must be a string" });
          }
        
        const cartItem = await customerHelpers.fetchCartItem(customerid)

        if(cartItem?.status) {
            res.status(200).json({ status: true, message: "Find successfully", payload: cartItem?.payload})
        }
        
    } catch(error) {
        console.error(error);
    }
}

export const deleteCartItem = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { id } = req.query

        if(!id || typeof id !== 'string') {
            return res.status(400).json({ status: false, message: "User ID is required and must be a string" });
        }

        const cartItem = await customerHelpers.deleteCartItem(id)

        if(cartItem?.status) {
            res.status(200).json({ status: true, message: "Deleted successfully" })
        }

    } catch(error) {
        console.error(error);
    }
}

export default {
    customerSignup,
    customerLogin,
    addCartItem,
    fetchAllCartItem,
    deleteCartItem
}