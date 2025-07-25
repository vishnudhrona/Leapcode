import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

interface DecodedToken {
    role?: string;
    exp?: number;
    iat?: number;
    userId?: string;
    name?: string
}

const CustomerNav = () => {
    const [loggedIn, setLoggedIn] = useState<DecodedToken | null>(null)


    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('customerToken');

        if (!token) {
            navigate('/customerlogin')
        } else {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                setLoggedIn(decoded || null)
            } catch (error) {
                console.error('Error decoding token:', error);
                navigate('/customenlandingpage');
            }
        }

    }, [navigate])

    const LogOut = () => {
        localStorage.removeItem("customerToken")
        navigate('/customerLogin')
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                    href="https://flowbite.com/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Hi! {loggedIn?.name}
                    </span>
                </a>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                            to={'/customercart'}
                                className="text-[40px]"
                            >
                                <FaShoppingCart />
                            </Link>
                        </li>
                        <li>
                            <button
                                className="text-md font-bold bg-red-500 rounded-lg text-white px-5 py-2"
                                onClick={LogOut}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default CustomerNav