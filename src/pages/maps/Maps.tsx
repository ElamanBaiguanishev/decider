import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import './maps.css'

const Maps: FC = () => {
    return (
        <div><div className='maps-container'><Outlet /></div></div>
    )
}

export default Maps