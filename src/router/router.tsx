import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error";
import Layout from "../pages/Layout";
import { deciderAction, deciderLoader } from "../pages/Decider";
import Decider from "../pages/Decider";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                // element: <Home />
            },
            {
                path: 'decider',
                loader: deciderLoader,
                action: deciderAction,
                element: <Decider />,
            },
            {
                path: 'kekw',
                // action: categoriesAction,
                // loader: categoryLoader,
                // element: <ProtectedRoute><Categories /></ProtectedRoute>
            },
            {
                path: 'auth',
                // element: <Auth />
            }
        ]
    }
])