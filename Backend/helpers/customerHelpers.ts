import CartItem from "../dbSchema/cartItem";
import Customer from "../dbSchema/customer";
import bcrypt from 'bcrypt';
import Product from "../dbSchema/product";

interface CustomerDetails {
    name: string;
    number: string;
    email: string;
    password: string;
  }

  interface LoginResponse {
    status: boolean;
    message: string;
    payload?: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  }

  interface LoginDetails {
    email: string;
    password: string;
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

  interface ProductPayload {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    // Add any other fields your product has
  }
  
  interface ProductResponse {
    status: boolean;
    message: string;
    payload?: ProductPayload;
  }

export const customenSignup =  async (customerDetails: CustomerDetails): Promise<{ status: boolean; message: string }> => {
    try {
        const { name, number, email, password } = customerDetails;

        const existingCustomer = await Customer.findOne({
            where: { email }
          });
      
          if (existingCustomer) {
            return ({ status: false, message: 'Email already exists' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newCustomer = await Customer.create({
            name,
            number,
            email,
            password: hashedPassword
          });

          return { status: true, message: "Customer signed in successfully" }

    } catch(error) {
        console.error(error);
        return { status: false, message: "Internal server error" };
    }
}

export const customerLogin = async (loginDetails: LoginDetails): Promise<LoginResponse> => {
    try {
        const { email, password } = loginDetails

        if (!email || !password) {
            return { status: false, message: "Email and password are required" };
        }

        const customer = await Customer.findOne({ where: { email } });        

        if (!customer) {
            return ({ status: false, message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return { status: false, message: "Invalid email or password" };
        }

        const payload = {
            id: customer?.id,
            name: customer.name,
            email: customer.email,
            role: "customer"
        }

        return { status: true, message: "Login successful", payload: payload};

    } catch (error) {
        return { status: false, message: "Internal server error" };
    }
}

export const addProductToCart =  async (payload: CartItemPayload): Promise<LoginResponse> => {
    try {

        const existingCartItem = await CartItem.findOne({
            where: {
                productId: payload?.productId
            }
        });

        if (existingCartItem) {
           return { status: false, message: "Item already exisist in your cart" };       
         }

        const newCartItem = await CartItem.create(payload);

        return { status: true, message: 'Product added to cart successfully'};

    } catch(error) {
        return { status: false, message: 'Internal server error'};
    }
}

export const fetchCartItem =  async (customerid: string): Promise<LoginResponse> => {
    try {
        const cartItems = await CartItem.findAll({
            where: { userId: customerid },
            order: [['createdAt', 'DESC']],
          });

          return { status: true, message: "Cart items fetched successfully", payload: cartItems };
      
    } catch(error) {
        return { status: true, message: "Internal error" };
    }
}

export const deleteCartItem = async (producId: string): Promise<LoginResponse> => {
    try {
        const deletedCount = await CartItem.destroy({
            where: { id: producId }
          });

          if (deletedCount === 0) {
            return { status: false, message: "Product not found" };
          }

          return { status: true, message: "Product deleted successfully" };
    } catch(error) {
        return { status: false, message: "Something went wrong while deleting the product" };
    }
}

export const fetchSingleProduct = async (id: string): Promise<ProductResponse> => {
    try {
        
        const singleProduct = await Product.findOne({
           where: { id: id }
        })        

        return { status: true, message: "Product find successfullu", payload: singleProduct?.dataValues }

    } catch(error) {
        return { status: false, message: "Something went wrong while deleting the product" };
    }
}


export default {
    customenSignup,
    customerLogin,
    addProductToCart,
    fetchCartItem,
    deleteCartItem,
    fetchSingleProduct
};