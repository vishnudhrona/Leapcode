import { Bounce, toast, ToastContainer } from "react-toastify";
import instance from "../../axios/Axios";
import Button from "./Button";
import { jwtDecode } from "jwt-decode";

interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    image?: string;
    imageUrl?: string
}

interface AllProductsProps {
    data: Product[];
}

interface DecodedToken {
    role?: string;
    exp?: number;
    iat?: number;
    id?: string;
    name?: string
}

const AllProducts: React.FC<AllProductsProps> = ({ data }) => {

    const addToCart = async (product: Product) => {
        const token = localStorage.getItem("customerToken")
        try {
            let response
            if (token) {
                const decoded = jwtDecode<DecodedToken>(token);
                const userId = decoded?.id;

                const payload = {
                    userId: userId,
                    product: product,
                };

                response = await instance.post('/customer/addproducttocart', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })


            }

            if (response?.data?.status) {
                toast.success('Item added to your cart', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    if (!data?.length) {
        return <p className="text-center text-gray-600">No products available.</p>;
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <h1 className="text-[60px] font-semibold my-10">All Products</h1>
            <div className="grid grid-cols-4 gap-10">
                {data?.map((value, index) => (
                    <div key={index} className="w-60 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg object-cover h-40" src={value?.imageUrl} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {value?.name}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {value?.description}
                            </p>
                            <Button
                                type="button"
                                buttonClassName="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                                value="Add To Cart"
                                onClick={() => addToCart(value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}

export default AllProducts