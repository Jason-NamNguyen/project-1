import React from 'react';
import App from './App';
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
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Auth/Register';
import ListQuiz from './Components/Users/ListQuiz';
import DetailQuiz from './Components/Users/DetailQuiz';
const Layout = () => {
    const NotFound = () => {
        return (
            <div className="container mt-3 alert alert-danger">
                404. Not Found data with URL
            </div>
        )
    }

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
                        element: <ListQuiz />
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
                path: "/quiz/:id",
                element: <DetailQuiz />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    )
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer
                position="top-right"
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