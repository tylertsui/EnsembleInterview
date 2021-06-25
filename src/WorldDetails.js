import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { film_link, character_link } from "./String";
import LinkBlock from "./LinkBlock";

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
                Film Appearances: {films.length > 0 ? (films.map((film, index) => {
                            return <LinkBlock key={index} data={film} path={film_link} name={film.title} />
                        })) : <div>NA</div>}
            </div>
            <div>
                Population: {world.population}
            </div>
            <div>
                Residents: {residents.length > 0 ? (residents.map((resident, index) => {
                            return <LinkBlock key={index} data={resident} path={character_link} name={resident.name} />
                        })) : <div>NA</div>}

            </div>
        </div>

    );
}

export default WorldDetails;