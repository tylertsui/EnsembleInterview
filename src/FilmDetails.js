import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import { character_link, specie_link, world_link, vehicle_link, starship_link, film_character_link } from "./String";
import LinkBlock from "./LinkBlock";

const FilmDetails = () => {

    // const [name, setName] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);
    
    const location = useLocation();
    const { toDisplay } = location.state;
    const film = toDisplay;

    useEffect(() => {
        // let characterPromises = film.characters.map((char) => {
        //     return axios.get(char);
        // });

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

        // axios.all(characterPromises).then((result) => {
        //     setName(result.map((char) => {
        //         return char.data;
        //     }));
        // });

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
            {/* <div>
                Character:
                <br />
                {name.length > 0 ? (name.map((char, index) => {
                    return <LinkBlock key={index} data={char} path={character_link} name={char.name} />
                })) : <div>NA</div>}
            </div> */}
            <div>
                <Link className="link" to={{
                    pathname: film_character_link,
                    state: {
                        characters: film.characters, 
                        title: film.title,
                    }
                }}>Characters Features in {film.title}</Link>
            </div>
            <div>
                Featured Planets: {
                    planets.length > 0 ? (planets.map((planet, index) => {
                        return <LinkBlock key={index} data={planet} path={world_link} name={planet.name} />
                    })) : <div>NA</div>}
            </div>
            <div>
                Featured Species: {
                    species.length > 0 ? (species.map((specie, index) => {
                        return <LinkBlock key={index} data={specie} path={specie_link} name={specie.name} />
                    })) : <div>NA</div>}
            </div>
            <div>
                Vehicles Featured: {
                    vehicles.length > 0 ? (vehicles.map((vehicle, index) => {
                        return <LinkBlock key={index} data={vehicle} path={vehicle_link} name={vehicle.name} />
                    })) : <div>NA</div>}
            </div>
            <div>
                Starships Featured: {
                    starships.length > 0 ? (starships.map((starship, index) => {
                        return <LinkBlock key={index} data={starship} path={starship_link} name={starship.name} />
                    })) : <div>NA</div>}
            </div>
        </div>
    )
};

export default FilmDetails;