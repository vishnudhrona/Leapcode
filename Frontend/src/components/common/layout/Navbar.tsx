import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

interface DecodedToken {
    role?: string;
    exp?: number;
    iat?: number;
    userId?: string;
}

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState<DecodedToken | null>(null)


    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('token');

        if (!token) {
            navigate('/')
        } else {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                setLoggedIn(decoded || null)
            } catch (error) {
                console.error('Error decoding token:', error);
                navigate('/');
            }
        }

    }, [navigate] )   

    const LogOut = () => {        
        localStorage.removeItem("token")
        navigate('/')
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
                        {loggedIn?.role}
                    </span>
                </a>
                <div className="flex md:order-2">
                    <button 
                    className="text-md font-bold bg-red-500 rounded-lg text-white px-5 py-2"
                    onClick={LogOut}
                    >
                        Logout
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-search"
                >
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="search-navbar"
                            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search..."
                        />
                    </div>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                to={'/landingpage'}
                                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                aria-current="page"
                            >
                                Product Management
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={ '/customermanagement'}
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Customer Management
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar