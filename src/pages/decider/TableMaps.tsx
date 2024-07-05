import React, { FC, useState, useEffect } from 'react'
import { IMap, IResponseDeciderLoader } from '../../types/types'
import './pagination.css'
import './decider.css'
import { Form, useLoaderData } from 'react-router-dom'
import PaginationTest from '@saurssaurav/pagination-js-react';
import '@saurssaurav/pagination-js-core/style.css';

const TableMaps: FC = () => {
    const { maps } = useLoaderData() as IResponseDeciderLoader;
    console.log('Maps:', maps); // Проверка содержимого maps
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMaps, setSelectedMaps] = useState<IMap[]>([]);

    const itemsPerPage = 12;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchQuery(value);
    };

    const filteredMaps = maps.filter(map => map.name.toLowerCase().includes(searchQuery));
    console.log('Filtered Maps:', filteredMaps); // Проверка содержимого filteredMaps

    const offset = (currentPage - 1) * itemsPerPage; // Исправление вычисления offset
    const currentItems = filteredMaps.slice(offset, offset + itemsPerPage);
    console.log('Current Items:', currentItems); // Проверка содержимого currentItems

    const pageCount = Math.ceil(filteredMaps.length / itemsPerPage);

    const onChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleMapClick = (map: IMap) => {
        if (selectedMaps.some(selectedMap => selectedMap.id === map.id)) {
            setSelectedMaps(selectedMaps.filter(selectedMap => selectedMap.id !== map.id));
        } else {
            setSelectedMaps([...selectedMaps, map]);
        }
    };

    return (
        <div className='container-editor'>
            <div>
                <input
                    type="text"
                    placeholder="Название карты.."
                    name="name"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                {currentItems && (
                    <div className='maps-grid'>
                        {currentItems.map((map, index) => (
                            <div className='map' key={index}>
                                <img
                                    className={selectedMaps.map(selectedMap => selectedMap.id).includes(map.id) ? 'map-image selected' : 'map-image'}
                                    src={`/src/assets/images/maps/${map.icon_path}.jpg`}
                                    alt={map.name}
                                    title={map.name}
                                    onClick={() => handleMapClick(map)}
                                />
                                <span className='map-name'>{map.name}</span>
                            </div>
                        ))}
                    </div>
                )}
                <PaginationTest
                    totalPage={pageCount}
                    pageSidesToCurrentPage={1}
                    currentPage={currentPage}
                    onChangeCurrentPage={onChange}
                ></PaginationTest>
            </div>

            <div>
                <div>Выбранные карты:</div>
                <div className='selected-maps'>
                    {selectedMaps.map((map, index) => (
                        <div className='map' key={index}>
                            <img
                                src={`/src/assets/images/maps/${map.icon_path}.jpg`}
                                alt={map.name}
                                title={map.name}
                                onClick={() => handleMapClick(map)}
                            />
                            <span className='map-name'>{map.name}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <Form method="post" action="/decider">
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
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default TableMaps;
