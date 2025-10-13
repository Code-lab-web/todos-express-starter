import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Home from "./Home";
import GardenCard from "./GardenCard";
import GardenTour from './GardenTour';
import SearchAppBar from './AppBar';
import gardens from "./data.json";
import './App.css';


function App() {
    return (
        <BrowserRouter>
            <SearchAppBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id"  element={<GardenTour />} />
            </Routes>
            <div className="App">
                <Container sx={{ marginY: 5 }}>
                    {gardens.map((garden) => (
                        <div key={garden.id}>
                            <Typography
                                variant="h4"
                                component="h2"
                                marginTop={5}
                                marginBottom={3}
                            >
                                Top {garden.name} Tours
                            </Typography>
                            <Grid container spacing={5}>
                                {garden.tours.map((tour, index) => (
                                    <GardenCard tour={tour} key={index} />
                                ))}
                            </Grid>
                        </div>
                    ))}
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
