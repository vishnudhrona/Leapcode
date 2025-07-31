import { useEffect, useState } from "react";
import CustomerNav from "../common/layout/CustomerNav"
import ProductView from "../common/ProductView"
import { useParams } from "react-router-dom"
import instance from "../../axios/Axios";

interface Product {
    id: number;
    name: string;
    price: string;
    stock: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    imageUrl?: string;
}

const SingleProductView = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = useParams();
    const token = localStorage.getItem('customerToken');        

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await instance.get(`/customer/fetchoneproduct?id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setProduct(response?.data?.payload)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [id])

    if (!product) {
        return (
            <>
                <CustomerNav />
                <div className="text-center p-6">No Products available</div>
            </>
        );
    }

    return (
        <>
            <CustomerNav />
            <div className="py-20">
            <ProductView data={product} />
            </div>
        </>
    )
}

export default SingleProductView