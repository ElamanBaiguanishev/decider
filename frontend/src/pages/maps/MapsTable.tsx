import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from "@mui/material";
import { IMapEntity } from "../../types/map/map-entity";
import { mapService } from "../../api/MapService";

const MapsTable: React.FC = () => {
    const [maps, setMaps] = useState<IMapEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchMaps = async () => {
        try {
            const mapsData = await mapService.getAll();
            setMaps(mapsData);
        } catch (error) {
            console.error("Ошибка при загрузке карт:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaps();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell>Режим карты</TableCell>
                        <TableCell>Иконка</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Автор</TableCell>
                        <TableCell>Порядок</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {maps.map((map) => (
                        <TableRow key={map.id}>
                            <TableCell>{map.name}</TableCell>
                            <TableCell>{map.map_mode}</TableCell>
                            <TableCell>
                                <img src={map.icon_path} alt={map.name} style={{ width: 50, height: 50 }} />
                            </TableCell>
                            <TableCell>{map.description}</TableCell>
                            <TableCell>{map.author}</TableCell>
                            <TableCell>{map.order}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MapsTable;
