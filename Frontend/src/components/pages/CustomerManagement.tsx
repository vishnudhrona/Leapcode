import { useEffect, useState } from "react"
import Navbar from "../common/layout/Navbar"
import instance from "../../axios/Axios";

interface Customer {
    name: string;
    email: string;
    number: string;
  }

let column = ["Name", "Email", "Mob. No"]

const CustomerManagement = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await instance.get('/users/fetchallcustomer', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setCustomers(response?.data?.payload?.payload)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [])

    return (
        <>
            <Navbar />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
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
                        {customers?.map((value, index) => (
                            <tr key={index} className="bg-white dark:bg-gray-800">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {value?.name}
                                </th>
                                <td className="px-6 py-4">{value?.email}</td>
                                <td className="px-6 py-4">{value?.number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CustomerManagement