import React, { FC, useState } from 'react'
import { IMap, IResponseDeciderLoader } from '../../types/types'
import { useLoaderData } from 'react-router-dom'
import PaginationTest from '@saurssaurav/pagination-js-react';
import '@saurssaurav/pagination-js-core/style.css';
import './pagination.css'

export const editorLoader = async (): Promise<{ maps: IMap[] } | null> => {
    // const testResponse = await instance.get("/maps")
    // console.log(testResponse.data)
    const response = await fetch('/maps.json'); 
    const maps: IMap[] = await response.json();
    return { maps };
}

export const editorAction = async ({ request }: any) => {
    switch (request.method) {
        case 'POST': {
            console.log('ПОСТ СРАБОТАЛ')
            // const formData = await request.formData()
            // const json: IMap[] = JSON.parse(formData.get('maps'))
            // const newDecider: IDecider = {
            //     title: formData.get('title'),
            //     description: formData.get('description'),
            //     maps: json.map(map => map.Id)
            // }
            // await instance.post('/deciders', newDecider)
            return null
        }
        case 'DELETE': {
            return null
        }
    }
}

const Editor: FC = () => {
    const { maps } = useLoaderData() as IResponseDeciderLoader;
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMaps, setSelectedMaps] = useState<IMap[]>([]);

    const itemsPerPage = 12;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchQuery(value);
    };

    const filteredMaps = maps.filter(map => map.Name.toLowerCase().includes(searchQuery));

    const offset = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredMaps.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(filteredMaps.length / itemsPerPage);

    const onChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleMapClick = (map: IMap) => {
        if (selectedMaps.some(selectedMap => selectedMap.Id === map.Id)) {
            setSelectedMaps(selectedMaps.filter(selectedMap => selectedMap.Id !== map.Id));
        } else {
            setSelectedMaps([...selectedMaps, map]);
        }
    };

    return (
        <div className='container-editor'>
            <div className='maps-container'>
                {currentItems && (
                    <div className='maps-grid'>
                        {currentItems.map((map, index) => (
                            <div className='map' key={index}>
                                <div className={selectedMaps.map(selectedMap => selectedMap.Id).includes(map.Id) ? 'map-image selected' : 'map-image'}>
                                    <img
                                        src={`/src/assets/images/maps/${map.Icon}.jpg`}
                                        alt={map.Name}
                                        title={map.Name}
                                        onClick={() => handleMapClick(map)}
                                    />
                                </div>
                                <span className='map-name'>{map.Name}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className='container-bottom'>
                    <PaginationTest
                        totalPage={pageCount}
                        pageSidesToCurrentPage={1}
                        currentPage={currentPage}
                        onChangeCurrentPage={onChange}
                    ></PaginationTest>

                    <input
                        type="text"
                        placeholder="Название карты.."
                        name="name"
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className='submit-form'>
                <h2>Выбранные карты:</h2>
                <div className='selected-maps'>
                    {selectedMaps.map((map, index) => (
                        <div className='map' key={index}>
                            <img
                                src={`/src/assets/images/maps/${map.Icon}.jpg`}
                                alt={map.Name}
                                title={map.Name}
                                onClick={() => handleMapClick(map)}
                            />
                            <span className='map-name'>{map.Name}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <label htmlFor="title">
                        <span>Название</span>
                        <input type="text" placeholder="Title.." name="title" />
                    </label>
                    <label htmlFor="description">
                        <span>Описание</span>
                        <input type="text" placeholder="Description.." name="description" />
                    </label>
                    <input type="hidden" value={JSON.stringify(selectedMaps)} name="maps" />
                    <button>Submit</button>
                </div>
            </div>


        </div>
    );
}

export default Editor;
