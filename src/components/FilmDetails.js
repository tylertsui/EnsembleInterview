import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import { specie_link, world_link, vehicle_link, starship_link, film_character_link } from "../strings/String";
import LinkBlockList from "../common/LinkBlockList";


// Organizes and displays film objects
const FilmDetails = () => {

    const [planets, setPlanets] = useState({loading: true, data: []});
    const [species, setSpecies] = useState({loading: true, data: []});
    const [vehicles, setVehicles] = useState({loading: true, data: []});
    const [starships, setStarships] = useState({loading: true, data: []});
    
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
            setPlanets({
                data: result.map((planet) => {
                    return planet.data;
                }),
                loading: false
            });
        });

        axios.all(speciePromises).then((result) => {
            setSpecies({
                data: result.map((specie) => {
                    return specie.data;
                }),
                loading: false
            });
        });

        axios.all(vehiclePromises).then((result) => {
            setVehicles({
                data: result.map((vehicle) => {
                    return vehicle.data;
                }),
                loading: false
            });
        });

        axios.all(starshipPromises).then((result) => {
            setStarships({
                data: result.map((starship) => {
                    return starship.data;
                }),
                loading: false
            });
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
                }}><button className="character-featured">Characters Features in {film.title}</button></Link></h5>
            </div>
            <div>
                <h5>Featured Planets: </h5> {planets.loading == true ? (<div>Loading</div>) : (<LinkBlockList dataList={planets.data} path={world_link}/>)}
            </div>
            <div>
                <h5>Featured Species:</h5> {species.loading == true ? (<div>Loading</div>) : (<LinkBlockList dataList={species.data} path={specie_link} />)}
            </div>
            <div>
                <h5>Vehicles Featured:</h5> {vehicles.loading == true ? (<div>Loading</div>) : (<LinkBlockList dataList={vehicles.data} path={vehicle_link} />)}
            </div>
            <div>
                <h5>Starships Featured:</h5> {starships.loading == true ? (<div>Loading</div>) : (<LinkBlockList dataList={starships.data} path={starship_link} />)}
            </div>
        </div>
    )
};

export default FilmDetails;