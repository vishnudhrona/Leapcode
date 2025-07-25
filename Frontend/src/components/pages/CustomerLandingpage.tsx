import { useEffect, useState } from "react"
import AllProducts from "../common/AllProducts"
import CustomerNav from "../common/layout/CustomerNav"
import instance from "../../axios/Axios"

const CustomerLandingpage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await instance.get('/users/fetchproducts',);
                setProducts(response?.data?.products)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [])

    console.log(22,products);
    

    return (
        <>
            <CustomerNav />
            <AllProducts 
            data={products}
            />
        </>
    )
}

export default CustomerLandingpage