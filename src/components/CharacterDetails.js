import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { film_link, world_link, specie_link, vehicle_link, starship_link } from "../strings/String";
import LinkBlock from "../common/LinkBlock";
import LinkBlockList from "../common/LinkBlockList";

const CharacterDetails = () => {

    const location = useLocation();
    const { toDisplay } = location.state;
    const character = toDisplay;

    const [films, setFilms] = useState([]);
    const [homeworld, setHomeword] = useState([]);
    const [species, setSpecies] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);

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

        let starshipPromises = character.starships.map((starship) => {
            return axios.get(starship);
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

        axios.all(starshipPromises).then((result) => {
            setStarships(result.map((starship) => {
                return starship.data;
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
                <h5>Film Appearances:</h5>
                {films.length > 0 ? (films.map((film, index) => {
                    return <LinkBlock key={index} data={film} path={film_link} name={film.title} />
                })) : <div>NA</div>}
            </div>
            <div>
                <h5>Home World: </h5> <LinkBlock data={homeworld} path={world_link} name={homeworld.name} />
            </div>
            <div>
                <h5>Species:</h5> <LinkBlockList dataList={species} path={specie_link} />
            </div>
            <div>
                <h5>Vehicles Piloted:</h5> <LinkBlockList dataList={vehicles} path={vehicle_link} />
            </div>
            <div>
                <h5>Starships Piloted:</h5> <LinkBlockList dataList={starships} path={starship_link} />
            </div>
        </div>
    )
}

export default CharacterDetails;