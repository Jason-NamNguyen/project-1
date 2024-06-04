import React from 'react';
import App from './App';
import Users from './Components/Users/Users'
import Admin from './Components/Admin/Admin'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomePage from './Components/Home/Homepage';
import DashBoard from './Components/Admin/Content/Dashboard';
import ManageUsers from './Components/Admin/Content/ManageUsers';
import ManageAdmin from './Components/Admin/Content/ManageAdmin';
import Products from './Components/Admin/Content/Products';
import Login from './Components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Auth/Register';
const Layout = () => {
    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <App />,
                children: [
                    {
                        index: true,
                        element: <HomePage />
                    },
                    {
                        path: "users",
                        element: <Users />
                    },
                ]
            },
            {
                path: "admin",
                element: <Admin></Admin>,
                children: [
                    {
                        index: true,
                        element: <DashBoard />
                    },
                    {
                        path: "manage-users",
                        element: <ManageUsers />
                    },
                    {
                        path: "manage-admin",
                        element: <ManageAdmin />
                    },
                    {
                        path: "products",
                        element: <Products />
                    }
                ]
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    )
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"

            />
        </>
    )
}
export default Layout;