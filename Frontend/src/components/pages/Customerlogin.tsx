import { Link, useNavigate } from "react-router-dom"
import Button from "../common/Button"
import Inputfield from "../common/Inputfield"
import { useEffect, useState } from "react";
import instance from "../../axios/Axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface CustomerSignupData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    submit?: string;
}

const Customerlogin = () => {
    const [formData, setFormData] = useState<CustomerSignupData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('customerToken');
        if (token) {
            navigate('/customerlandingpage')
        } else {
            navigate('/customerlogin')
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<CustomerSignupData> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await instance.post('/customer/customerlogin', formData)

                if (response?.data?.status) {
                    localStorage.setItem("customerToken", response?.data?.token)
                    navigate('/customerlandingpage')
                } else {
                    toast.error(response?.data?.message, {
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
                console.error('Signup error:', error);
                setErrors({ submit: 'Failed to create account. Please try again.' });
            }
        }
    };

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
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Customer Log In
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <Inputfield
                                        label="Email"
                                        type="email"
                                        name="email"
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        autoComplete="email"
                                        labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        inputFileldClassName="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <Inputfield
                                        label="Password"
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        autoComplete="current-password"
                                        labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        inputFileldClassName="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    value="Log In"
                                    buttonClassName="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                />
                            </form>
                            <Link to={'/customersignup'} className="text-blue-500 font-semibold hover:text-blue-600">Create new account</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Customerlogin