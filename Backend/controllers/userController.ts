import { Request, Response } from 'express';
import staticAdmins from '../config/staticAdmin';
import generateToken from '../utils/generateToken';
import adminHelpers from '../helpers/adminHelpers';
import path from 'path';
import fs from "fs";


interface User {
    id: number;
    email: string;
    role: string;
  }

export const userLogin = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { email, password } = req.body;

        const user = staticAdmins.find(
            (admin) => admin.email === email && admin.password === password
          );
          
          if (!user) {
            return res.status(200).json({ status: false, message: 'Invalid credentials' });
          }

          const userForToken: User = {
            id: user.id,
            email: user.email,
            role: user.role
        };        

        const token = generateToken(userForToken);

        res.status(200).json({ status: true, message: 'Login successful', user: { id: user.id, email: user.email, role: user.role, }, token });

    } catch(error) {
        console.error(error);
    }
}

export const addProduct = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { name, price, stock, description } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const productData = {
            name,
            price,
            stock,
            description,
            image: imageFile.filename 
        };

        let newProduct = await adminHelpers.addProduct(productData)
        
        res.status(200).json({ status: true, message: "Product added"})
    } catch(error) {
        console.error(error);
    }
}

export const fetchAllProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const BASE_URL = "http://localhost:3000/uploads";
        const allProducts = await adminHelpers.fetchAllProducts();

        if(Array.isArray(allProducts)) {
            const formattedProducts = allProducts.map((product: any) => {
                const data = product.toJSON?.() ?? product;
    
                return {
                    ...data,
                    imageUrl: `${BASE_URL}/${data.image}`,
                };
            });

            return res.status(200).json({ status: true, products: formattedProducts });
        } else {
            return res.status(500).json({ status: false, message: 'Failed to fetch products.' });
        }
       
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({
            status: false,
            message: 'Failed to fetch products.',
        });
    }
};

export const editProduct = async (req: Request, res: Response): Promise<Response | void> => {
    try {

        const { id, name, description, price, stock, image } = req.body
        const imageFile = req.file;
        
        let productData

        if (imageFile) {
            const oldImageName = image?.split("/").pop();
            const oldImagePath = path.join(__dirname, "..", "uploads", oldImageName || "");
            if (oldImageName && fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
              }

            productData = {
                id,
                name,
                price,
                stock,
                description,
                image:  imageFile?.filename
            };
        } else {
            const existingImageName = image?.split("/").pop();

            productData = {
                id,
                name,
                price,
                stock,
                description,
                image: existingImageName
            };
        }

        let updatedProduct = await adminHelpers.editProduct(productData)

        if(updatedProduct?.status) {
            res.status(200).json({ status: true, message: "updated successfully"})
        }

    } catch (error) {
        console.error(error);
    }
}

export const deleteProduct =  async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const id = req.query.id as string;

    if (!id) {
      return res.status(400).json({ status: false, message: "Product ID is required" });
    }

    const deleteProduct = await adminHelpers.deleteProduct(id);

    if(deleteProduct?.status) {
        res.status(200).json({ status: true, message: "Product deleted successfully"})
    }
        
    } catch(error) {
        console.error(error);
    }
}

export const fetchAllCustomer =  async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const allCustomers = await adminHelpers.fetchAllCustomers()

        console.log(166,allCustomers);

        res.status(200).json({ status: true, payload: allCustomers})
        
    } catch(error) {
        console.error(error);
    }
}

export default {
    userLogin,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
    fetchAllCustomer
}