import { jwtDecode } from "jwt-decode";
import instance from "../../axios/Axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface Product {
    id: number;
    name: string;
    price: string;
    stock: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    imageUrl?: string; // Keep this if you're still using it elsewhere
}

interface ProductViewProps {
    data: Product;
}

interface DecodedToken {
    role?: string;
    exp?: number;
    iat?: number;
    id?: string;
    name?: string
}

const ProductView: React.FC<ProductViewProps> = ({ data }) => {

    const addToCart = async () => {
        const token = localStorage.getItem("customerToken")
        try {
            let response
            if (token) {
                const decoded = jwtDecode<DecodedToken>(token);
                const userId = decoded?.id;

                const payload = {
                    userId: userId,
                    product: data,
                };

                console.log(44,payload);
                

                response = await instance.post('/customer/addproducttocart', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }   

            console.log(51, response);
            
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
            } else {
                toast.error('Item already exisist in your cart', {
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
        } catch(error) {
            console.error(error);
        }
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
        <div className="max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="aspect-square">
                    {data?.imageUrl && (
                        <img
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                            src={data?.imageUrl}
                            alt=""
                        />
                    )}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {data?.name}
                        </h1>
                        <p className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                            ${data?.price}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                            Description                       
                        </h3>
                        {data?.description && (

                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {data?.description}
                            </p>
                        )}

                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Quantity
                                </label>
                                {data?.stock && (
                                    <p>{data?.stock} </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <button
                            type="button"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        onClick={addToCart}
                        >
                            Add to Cart
                        </button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
                                </svg>
                                Free shipping
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                30-day returns
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductView