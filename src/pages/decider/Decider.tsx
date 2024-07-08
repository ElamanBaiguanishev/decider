import { FC } from 'react'
import { Outlet } from 'react-router-dom';
import './decider.css'

const Decider: FC = () => {
    return <div className='container-editor'><Outlet /></div>
}

export default Decider