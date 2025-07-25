import { useEffect, useState } from "react";
import Button from "./Button"
import AddProductModal from "./Modal/AddProductModal";
import EditProduct from "./Modal/EditProduct";
import { jwtDecode } from "jwt-decode";


export interface Product {
    id: string;
    name: string;
    price: string;
    stock: string;
    description: string;
    image: string;
    imageUrl?: string;
}

interface TableProps {
    column: string[];
    data: Product[];
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editOpen: boolean;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deleteProduct: (id: string) => void;
}

interface DecodedToken {
    role?: string;
    exp?: number;
    iat?: number;
    userId?: string;
}


const Table = ({ column, data, open, setOpen, editOpen, setEditOpen, deleteProduct }: TableProps) => {

    // const [open, setOpen] = useState<Boolean>(false)
    const [productDetails, setProductDetails] = useState<Product>({
        id: '',
        name: '',
        price: '',
        stock: '',
        description: '',
        image: '',
        imageUrl: ''
    })
    const [loggedIn, setLoggedIn] = useState<DecodedToken | null>(null)

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token);
            setLoggedIn(decoded || null)
        }

    }, [])


    const handleModalClose = () => {
        setOpen(false)
        setEditOpen(false)
    }

    return (
        <>
            <div className="flex justify-end my-10">
                <Button
                    type='button'
                    buttonClassName='bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600'
                    value="Add Product"
                    onClick={() => setOpen(!open)}
                />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {column?.map((value, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {value}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((value, index) => (
                            <tr key={index} className="bg-white dark:bg-gray-800">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {value?.name}
                                </th>
                                <td className="px-6 py-4">${value?.price}</td>
                                <td className="px-6 py-4">{value?.stock}</td>
                                <td className="px-6 py-4">{value?.description}</td>
                                <td className="px-6 py-4">
                                    <img className="w-12" src={value?.imageUrl} alt="" />
                                </td>
                                <td className="px-6 py-4">
                                    <Button
                                        type="button"
                                        buttonClassName="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => {
                                            setProductDetails(value)
                                            setEditOpen(!editOpen)
                                        }}
                                        value="Edit"
                                    />
                                    {loggedIn && loggedIn?.role === "superadmin" && (
                                        <>
                                            <span className="text-black font-bold px-2">/</span>
                                            <Button
                                                type="button"
                                                buttonClassName="font-medium text-red-600 dark:text-blue-500 hover:underline"
                                                onClick={() => deleteProduct(value?.id)}
                                                value="Delete"
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {open && (
                <AddProductModal
                    onClose={handleModalClose}
                />
            )}

            {editOpen && (
                <EditProduct
                    productDetails={productDetails}
                    onClose={handleModalClose}
                />
            )}
        </>

    )
}

export default Table