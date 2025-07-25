import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../axios/Axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    role?: string;
    exp?: number;
    iat?: number;
    id?: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl: string;
    image: string;
    quantity: number;
}

const CustomerCartView = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loggedIn, setLoggedIn] = useState<DecodedToken | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false)

    const token = localStorage.getItem('customerToken');

    useEffect(() => {
        const token = localStorage.getItem('customerToken');
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token);
            setLoggedIn(decoded || null);
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!loggedIn?.id) return;

            try {
                const response = await instance.get(
                    `/customer/fetchcartitem?customerid=${loggedIn?.id}`,{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                // Add quantity field to each product (default to 1)
                const fetchedProducts = response?.data?.payload?.map((item: any) => ({
                    ...item,
                    quantity: 1
                })) || [];

                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [loggedIn, refresh]);

    const updateQuantity = (index: number, type: 'increase' | 'decrease') => {
        setProducts(prev => {
            const updated = [...prev];
            const current = updated[index];
            
            if (type === 'increase' && current.quantity < current.stock) {
                updated[index] = { ...current, quantity: current.quantity + 1 };
            } else if (type === 'decrease' && current.quantity > 1) {
                updated[index] = { ...current, quantity: current.quantity - 1 };
            }
            
            return updated;
        });
    };

    const removeItem = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");

        if (!confirmed) return;
        try {
            const response = await instance.delete(`/customer/deletecartitem?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response?.data?.status) {
                setRefresh(!refresh)
            }
            
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div className="w-[1800px] mx-auto p-6 bg-white">
            <div className="flex items-center mb-8">
                <ShoppingCart className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {products.length} items
                </span>
            </div>

            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-8">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        {products.map((item, index) => (
                            <div
                                key={item.id}
                                className={`p-6 ${index !== products.length - 1 ? 'border-b border-gray-200' : ''}`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.image}
                                            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-xl font-bold text-gray-900">${item.price}</p>
                                        <p className="text-sm text-gray-500">Stock: {item.stock}</p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(index, 'decrease')}
                                                disabled={item.quantity <= 1}
                                                className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Minus className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <span className="px-4 py-2 border-l border-r border-gray-300 bg-gray-50 font-medium min-w-[3rem] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(index, 'increase')}
                                                disabled={item.quantity >= item.stock}
                                                className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Plus className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => removeItem(item?.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                        Item total: ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <Link
                            to={'/customerlandingpage'}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                            <span>← Continue Shopping</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerCartView;