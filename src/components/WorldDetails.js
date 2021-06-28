import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { character_link } from "../strings/String";
import FilmBlockList from "../common/FilmBlockList";
import LinkBlockList from "../common/LinkBlockList";


// Organizes and displays WorldDetails objects
const WorldDetails = () => {

    const location = useLocation();
    const { toDisplay } = location.state;
    const world = toDisplay;

    const [residents, setResidents] = useState([]);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        let worldPromises = world.residents.map((resident) => {
            return axios.get(resident);
        });

        let filmPromises = world.films.map((film) => {
            return axios.get(film);
        });

        axios.all(worldPromises).then((results) => {
            setResidents(results.map((resident) => {
                return resident.data;
            }));
        });

        axios.all(filmPromises).then((results) => {
            setFilms(results.map((film) => {
                return film.data;
            }));
        });
    }, []);

    return (
        <div>
            <div>
                Planet: {world.name}
            </div>
            <div>
                Climate: {world.climate}
            </div>
            <div>
                Diameter: {world.diameter}
            </div>
            <div>
                Rotation Period: {world.rotation_period}
            </div>
            <div>
                Orbital Period: {world.orbital_period}
            </div>
            <div>
                Terrain: {world.terrain}
            </div>
            <div>
                Surface Water: {world.surface_water}
            </div>
            <div>
                <h5>Film Appearances:</h5> <FilmBlockList dataList={films} />
            </div>
            <div>
                Population: {world.population}
            </div>
            <div>
                <h5>Residents:</h5> <LinkBlockList dataList={residents} path={character_link} />
            </div>
        </div>

    );
}

export default WorldDetails;