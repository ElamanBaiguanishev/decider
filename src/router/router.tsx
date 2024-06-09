import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error";
import Layout from "../pages/mainLayout/Layout";
import Decider, { deciderAction, deciderLoader } from "../pages/decider/Decider";
import Websocket from "../pages/decider/websocket";
import TableMaps from "../pages/decider/TableMaps";

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
                element: <Decider />,
                children: [
                    {
                        path: "list",
                        // element: <CreateChatPage />
                    },
                    {
                        path: "editor",
                        loader: deciderLoader,
                        action: deciderAction,
                        element: <TableMaps />
                    }
                ]
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