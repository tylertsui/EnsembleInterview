import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { film_link, world_link, specie_link, vehicle_link } from "./String";
import LinkBlock from "./LinkBlock";

const CharacterDetails = () => {

    const location = useLocation();
    const { toDisplay } = location.state;
    const character = toDisplay;

    const [films, setFilms] = useState([{name: ""}]);
    const [homeworld, setHomeword] = useState([{name: ""}]);
    const [species, setSpecies] = useState([{name: ""}]);
    const [vehicles, setVehicles] = useState([{name: ""}]);

    useEffect(() => {
        let filmPromises = character.films.map((film) => {
            return axios.get(film);
        });

        let speciePromises = character.species.map((specie) => {
            return axios.get(specie);
        });

        let vehiclePromises = character.vehicles.map((vehicle) => {
            return axios.get(vehicle);
        });

        axios.all(filmPromises).then((result) => {
            setFilms(result.map((film) => {
                return film.data;
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

        axios.get(character.homeworld).then((result) => {
            setHomeword(result.data);
        });

    }, []);

    return (
        <div>
            <div>
                Name: {character.name}
            </div>
            <div>
                Birth Date: {character.birth_year}
            </div>
            <div>
                Eye Color: {character.eye_color}
            </div>
            <div>
                Gender: {character.gender}
            </div>
            <div>
                Hair Colour: {character.hair_color}
            </div>
            <div>
                Mass: {character.mass}
            </div>
            <div>
                Skin Color: {character.skin_color}
            </div>
            <div>
                Film Appearances: {films.length > 0 ? (films.map((film, index) => {
                    return <LinkBlock key={index} data={film} path={film_link} name={film.title} />
                })) : <div>NA</div>}
            </div>
            <div>
                Home World: <LinkBlock data={homeworld} path={world_link} name={homeworld.name} />
            </div>
            <div>
                Species: {
                    species.length > 0 ? (species.map((specie, index) => {
                        return <LinkBlock key={index} data={specie} path={specie_link} name={specie.name} />
                    })) : <div>NA</div>}
            </div>
            <div>
                Vehicles Driven: {
                    vehicles.length > 0 ? (vehicles.map((vehicle, index) => {
                        return <LinkBlock key={index} data={vehicle} path={vehicle_link} name={vehicle.name} />
                    })) : <div>NA</div>}
            </div>
        </div>
    )
}

export default CharacterDetails;