import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/home/HomePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        // errorElement: <MiniApp404 />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'logs',
                // element: <ProtectedRoute><LogTable /></ProtectedRoute>
            }
        ]
    }
])