import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import MapsTable from "../pages/maps/MapsTable";
import Decider from "../pages/decider/Decider";
import CreateDecider from "../pages/decider/CreateDecider";
import DeciderList from "../pages/decider/DeciderList";
import DeciderDetail from "../pages/decider/DeciderDetail";
import LobbyRoom from "../pages/lobby/LobbyRoom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "decider",
                element: <Decider />,
                children: [
                    {
                        path: "create",
                        element: <CreateDecider />,
                    },
                    {
                        path: "list",
                        element: <DeciderList />,
                    },
                ],
            },
            {
                path: 'deciders/:id',
                element: <DeciderDetail />
            },
            {
                path: 'lobby/:id',
                element: <LobbyRoom />
            },
            {
                path: 'maps',
                element: <MapsTable />
            },
        ]
    }
])