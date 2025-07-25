import { useEffect, useState } from 'react'
import Navbar from '../common/layout/Navbar'
import Table from "../common/Table"
import instance from '../../axios/Axios'

let column = ["Product Name", "Price", "Stock", "Description", "Image", "Action"]

const Productmanagement = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState<boolean>(false)
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await instance.get('/users/fetchproducts');
                setProducts(response?.data?.products)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [open, editOpen, refresh])

    const deleteProduct = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");

        if (!confirmed) return;
        try {
            const token = localStorage.getItem('token')

            const response = await instance.delete(`/users/deleteproduct?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response?.data?.status) {

                setRefresh(!refresh)
                alert("Product deleted successfully");

            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Navbar />
            <Table
                column={column}
                data={products}
                open={open}
                setOpen={setOpen}
                editOpen={editOpen}
                setEditOpen={setEditOpen}
                deleteProduct={deleteProduct}
            />
        </>
    )
}

export default Productmanagement