import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error";
import Layout from "../pages/mainLayout/Layout";
import Decider from "../pages/Decider";
import Websocket from "../pages/decider/websocket";

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
                // loader: deciderLoader,
                // action: deciderAction,
                element: <Decider />,
            },
            {
                path: 'webosocket',
                // action: categoriesAction,
                // loader: categoryLoader,
                element: <Websocket />
            },
            {
                path: 'auth',
                // element: <Auth />
            }
        ]
    }
])