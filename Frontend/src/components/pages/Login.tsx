import { useEffect, useState } from "react";
import Inputfield from "../common/Inputfield"
import Button from "../common/Button";
import instance from "../../axios/Axios";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
    email: string;
    password: string;
    label?: string
}

const Login: React.FC = () => {

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token) {
            navigate('/landingpage')
        } else {
            navigate('/')
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await instance.post('/users/userlogin',formData)  
            
            const { status, token } = response.data;
            
            if (status) {
                localStorage.setItem('token', token); // Save 
                navigate('/landingpage')
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
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
                            <Button
                                type="submit"
                                value="Log In"
                                buttonClassName="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Login