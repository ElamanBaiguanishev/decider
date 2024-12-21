import React, { FC, useState, useEffect } from "react";
import { Button, TextField, Typography, Box, Paper, Avatar, Pagination } from "@mui/material";
import { mapService } from "../../api/MapService";
import { IMapEntity } from "../../types/map/MapEntity";
import { deciderService } from "../../api/DeciderService";

const CreateDecider: FC = () => {
    const [maps, setMaps] = useState<IMapEntity[]>([]);
    const [selectedMaps, setSelectedMaps] = useState<IMapEntity[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const itemsPerPage = 12;

    // Fetch all maps from the service
    useEffect(() => {
        const fetchMaps = async () => {
            try {
                const allMaps = await mapService.getAll();
                setMaps(allMaps);
            } catch (error) {
                console.error("Error fetching maps:", error);
            }
        };
        fetchMaps();
    }, []);

    // Filter maps based on search query
    const filteredMaps = maps.filter(map =>
        map.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const offset = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredMaps.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredMaps.length / itemsPerPage);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleMapClick = (map: IMapEntity) => {
        if (selectedMaps.some(selectedMap => selectedMap.id === map.id)) {
            setSelectedMaps(selectedMaps.filter(selectedMap => selectedMap.id !== map.id));
        } else {
            setSelectedMaps([...selectedMaps, map]);
        }
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const deciderData = {
            title,
            description,
            creator: 1,
            maps: selectedMaps
        };

        try {
            await deciderService.create(deciderData);  // Создаем новый Decider
            alert("Decider created successfully!");
        } catch (error) {
            console.error("Error creating decider:", error);
            alert("Failed to create decider.");
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Создание десайдера
            </Typography>

            <TextField
                label="Поиск карт"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ marginBottom: 2 }}
            />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {currentItems.map(map => (
                    <Paper
                        key={map.id}
                        sx={{
                            width: 120,
                            padding: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            cursor: "pointer",
                            border: selectedMaps.some(selectedMap => selectedMap.id === map.id) ? "2px solid #1976d2" : "none"
                        }}
                        onClick={() => handleMapClick(map)}
                    >
                        <Avatar
                            sx={{ width: 80, height: 80, marginBottom: 1 }}
                            src={`/${map.icon_path}.jpg`}
                            alt={map.name}
                        />
                        <Typography variant="body2" align="center">{map.name}</Typography>
                    </Paper>
                ))}
            </Box>

            <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{ marginTop: 2 }}
            />

            <Box sx={{ marginTop: 3 }}>
                <Typography variant="h6">Выбранные карты</Typography>
                <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                    {selectedMaps.map(map => (
                        <Avatar
                            key={map.id}
                            sx={{ width: 60, height: 60 }}
                            src={`/${map.icon_path}.jpg`}
                            alt={map.name}
                        />
                    ))}
                </Box>
            </Box>

            <Box sx={{ marginTop: 3 }}>
                <TextField label="Название" variant="outlined" fullWidth sx={{ marginBottom: 2 }} value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <TextField label="Описание" variant="outlined" fullWidth sx={{ marginBottom: 2 }} value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <input type="hidden" value={JSON.stringify(selectedMaps)} name="maps" />
                <Button variant="contained" color="primary" onClick={(e) => handleSubmit(e)} fullWidth>Создать</Button>
            </Box>
        </Box>
    );
};

export default CreateDecider;
