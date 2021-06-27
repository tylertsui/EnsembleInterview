import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import { specie_link, world_link, vehicle_link, starship_link, film_character_link } from "../strings/String";
import LinkBlockList from "../common/LinkBlockList";

const FilmDetails = () => {

    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);
    
    const location = useLocation();
    const { toDisplay } = location.state;
    const film = toDisplay;

    useEffect(() => {

        let worldPromises = film.planets.map((planet) => {
            return axios.get(planet);
        });

        let speciePromises = film.species.map((specie) => {
            return axios.get(specie);
        });

        let vehiclePromises = film.vehicles.map((vehicle) => {
            return axios.get(vehicle);
        });

        let starshipPromises = film.starships.map((starship) => {
            return axios.get(starship);
        });

        axios.all(worldPromises).then((result) => {
            setPlanets(result.map((planet) => {
                return planet.data;
            }));
        });

        axios.all(speciePromises).then((result) => {
            setSpecies(result.map((specie) => {
                return specie.data;
            }));
        });

        axios.all(vehiclePromises).then((result) => {
            setVehicles(result.map((vehicle) => {
                return vehicle.data;
            }));
        });

        axios.all(starshipPromises).then((result) => {
            setStarships(result.map((starship) => {
                return starship.data;
            }));
        });
    }, []);

    return (
        <div>
            <div>
                Title: {film.title}
            </div>
            <div>
                Episode: {film.episode_id}
            </div>
            <div>
                Opening Crawl:
                <br />
                {film.opening_crawl}
            </div>
            <div>
                Director: {film.director}
            </div>
            <div>
                Producer: {film.producer}
            </div>
            <div>
                Release Date: {film.release_date}
            </div>
            <div>
                <h5><Link className="link" to={{
                    pathname: film_character_link,
                    state: {
                        characters: film.characters, 
                        title: film.title,
                    }
                }}>Characters Features in {film.title}</Link></h5>
            </div>
            <div>
                <h5>Featured Planets: </h5> <LinkBlockList dataList={planets} path={world_link}/> 
            </div>
            <div>
                <h5>Featured Species:</h5> <LinkBlockList dataList={species} path={specie_link} />
            </div>
            <div>
                <h5>Vehicles Featured:</h5> <LinkBlockList dataList={vehicles} path={vehicle_link} />
            </div>
            <div>
                <h5>Starships Featured:</h5> <LinkBlockList dataList={starships} path={starship_link} />
            </div>
        </div>
    )
};

export default FilmDetails;