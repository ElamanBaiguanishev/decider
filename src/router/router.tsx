import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error";
import Layout from "../pages/mainLayout/Layout";
import Decider from "../pages/decider/Decider";
import Websocket from "../pages/decider/websocket";
import Editor, { editorAction, editorLoader } from "../pages/decider/Editor";
import DeciderList, { deciderListAction, deciderListLoader } from "../pages/decider/DeciderList";

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
                        loader: deciderListLoader,
                        action: deciderListAction,
                        element: <DeciderList />
                    },
                    {
                        path: "editor",
                        loader: editorLoader,
                        action: editorAction,
                        element: <Editor />
                    }
                ]
            },
            {
                path: 'webosocket',
                element: <Websocket />
            },
            {
                path: 'auth',
                // element: <Auth />
            }
        ]
    }
])