import { FC } from "react"
import { Outlet } from "react-router-dom"
import Header from "../header/Header"
import './layout.css'

const Layout: FC = () => {
    return <div className="layout">
        <Header />
        <main>
            <Outlet />
        </main>
    </div>
}

export default Layout