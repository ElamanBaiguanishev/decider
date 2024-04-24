import { FC, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { IMap, IResponseDeciderLoader } from '../types/types'
import './pagination.css'
import { Form, useLoaderData } from 'react-router-dom'

const TableMaps: FC = () => {
    const { maps } = useLoaderData() as IResponseDeciderLoader;
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedMaps, setSelectedMaps] = useState<IMap[]>([]);

    const itemsPerPage = 9;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredMaps = maps.filter(map => map.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const offset = currentPage * itemsPerPage;
    const pageCount = Math.ceil(filteredMaps.length / itemsPerPage)

    const currentItems = filteredMaps.slice(offset, offset + itemsPerPage)

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)
    };

    const handleMapClick = (map: IMap) => {
        if (selectedMaps.some(selectedMap => selectedMap.id === map.id)) {
            setSelectedMaps(selectedMaps.filter(selectedMap => selectedMap.id !== map.id));
        } else {
            setSelectedMaps([...selectedMaps, map]);
        }
    };


    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div >
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
                            <div className='map'>
                                <img
                                    className={selectedMaps.map(map => map.id).includes(map.id) ? 'map-image selected' : 'map-image'}
                                    src={`src/assets/images/maps/${map.icon_path}.jpg`}
                                    alt="{value.name}"
                                    key={index}
                                    title={map.name}
                                    onClick={() => handleMapClick(map)}
                                />
                                <span className='map-name'>{map.name}</span>
                            </div>
                        ))}
                    </div>
                )}
                <ReactPaginate
                    containerClassName={'pagination'}
                    activeClassName={'activeClassName'}
                    pageLinkClassName={'pageLinkClassName'}
                    previousClassName={'previousClassName'}
                    nextClassName={'nextClassName'}
                    disabledClassName={'disabledClassName'}
                    disabledLinkClassName={'disabledLinkClassName'}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                />
            </div>

            <div>
                <div>Выбранные карты:</div>
                <div className='selected-maps'>
                    {selectedMaps.map((map, index) => (
                        <div className='map'>
                            <img
                                // className={selectedMaps.map(map => map.id).includes(map.id) ? 'map-image selected' : 'map-image'}
                                src={`src/assets/images/maps/${map.icon_path}.jpg`}
                                alt="{value.name}"
                                key={index}
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

export default TableMaps