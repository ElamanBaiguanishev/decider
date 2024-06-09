import { FC } from 'react'
import { IDecider, IMap } from '../../types/types'
import { instance } from '../../api/axios.api'
import { Outlet } from 'react-router-dom';
import './decider.css'

export const deciderLoader = async (): Promise<{ maps: IMap[] } | null> => {
    const response = await fetch('/maps.json'); // Убедитесь, что maps.json доступен по этому пути
    const maps: IMap[] = await response.json();
    return { maps };
}

export const deciderAction = async ({ request }: any) => {
    switch (request.method) {
        case 'POST': {
            console.log('ПОСТ СРАБОТАЛ')
            const formData = await request.formData()
            const json: IMap[] = JSON.parse(formData.get('maps'))
            const newDecider: IDecider = {
                title: formData.get('title'),
                description: formData.get('description'),
                maps: json.map(map => map.id)
            }
            await instance.post('/deciders', newDecider)
            return null
        }
        case 'DELETE': {
            return null
        }
    }
}

const Decider: FC = () => {
    return <div className='container-editor'><Outlet /></div>
}

export default Decider