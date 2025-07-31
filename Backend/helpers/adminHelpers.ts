import Customer from "../dbSchema/customer";
import ProductModel from "../dbSchema/product";

// Rename interface to avoid naming conflict with imported model
export interface IProduct {
    name: string;
    price: string;
    stock: string;
    description: string;
    image: string;
    id?: string
}

export const addProduct = async (product: IProduct): Promise<{ status: boolean; message?: string }> => {
    try {
        await ProductModel.create(product);
        return { status: true };
    } catch (error) {
        console.error('Error adding product:', error);
        return { status: false, message: 'Failed to add product' };
    }
};

export const fetchAllProducts = async (): Promise<{ status: boolean; products?: any[]; message?: string; }> => {
    try {
        const products = await ProductModel.findAll(
            {
                order: [['createdAt', 'ASC']]
            }
        );

        return products

    } catch (error) {
        console.error("Error fetching products:", error);
        return { status: false, message: "Failed to fetch products" };
    }
};

export const editProduct = async (updatedProduct: IProduct): Promise<{ status: boolean; products?: any[]; message?: string; }> => {
    try {
        const { id, name, description, price, stock, image } = updatedProduct;

        const [updatedRows] = await ProductModel.update(
            {
                name,
                description,
                price,
                stock,
                image
            },
            {
                where: { id }
            }
        );        

        if (updatedRows === 0) {
            return { status: false, message: "No product found with the given ID" };
        }

        return { status: true, message: "Product updated successfully" };

    } catch (error) {
        console.error("Sequelize update error:", error);
        return { status: false, message: "Something went wrong while updating the product" };
    }
}

export const deleteProduct = async (id: string): Promise<{ status: boolean; message: string }> => {
    try {
      const deletedCount = await ProductModel.destroy({
        where: { id }
      });
  
      if (deletedCount === 0) {
        return { status: false, message: "Product not found" };
      }
  
      return { status: true, message: "Product deleted successfully" };
  
    } catch (error) {
      return { status: false, message: "Something went wrong while deleting the product" };
    }
  };

  export const fetchAllCustomers = async (): Promise<{ status: boolean; payload?: any; message: string }> => {
    try {
        const products = await Customer.findAll();

        return { status: true, message: "fetch all customer", payload: products}
    } catch(error) {
        return { status: false, message: "Internal error" }
    }
  }
  

export default {
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
    fetchAllCustomers
};
