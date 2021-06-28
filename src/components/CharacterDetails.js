import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { world_link, specie_link, vehicle_link, starship_link } from "../strings/String";
import LinkBlock from "../common/LinkBlock";
import FilmBlockList from "../common/FilmBlockList";
import LinkBlockList from "../common/LinkBlockList";


// Organizes and displays character objects
const CharacterDetails = () => {

    const location = useLocation();
    const { toDisplay } = location.state;
    const character = toDisplay;

    const [films, setFilms] = useState({loading: true, data: []});
    const [homeworld, setHomeword] = useState({loading: true, data: []});
    const [species, setSpecies] = useState({loading: true, data: []});
    const [vehicles, setVehicles] = useState({loading: true, data: []});
    const [starships, setStarships] = useState({loading: true, data: []});

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
            setFilms({
                data: result.map((film) => {
                    return film.data;
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

        axios.get(character.homeworld).then((result) => {
            setHomeword({
                data: result.data,
                loading: false
            });
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
                <h5>Film Appearances:</h5> {films.loading == true ? (<div>Loading</div>) : (<FilmBlockList dataList={films.data} />)}
            </div>
            <div>
            <h5>
                Home World:</h5> {homeworld.loading == true ? (<div>Loading</div>) : (
                    homeworld.data.length > 0 ? (<LinkBlock data={homeworld.data} path={world_link} name={homeworld.data.name} />) : (<div>NA</div>)
                )}
            </div>
            <div>
                <h5>Species:</h5> {species.loading == true ? (<div>Loading</div>) : (<LinkBlockList dataList={species.data} path={specie_link} />)}
            </div>
            <div>
                <h5>Vehicles Piloted:</h5> {vehicles.loading == true ? (<div>Loading</div>) : (<LinkBlockList dataList={vehicles.data} path={vehicle_link} />)}
            </div>
            <div>
                <h5>Starships Piloted:</h5> {starships.loading == true ? (<div>Loading</div>) : (<LinkBlockList dataList={starships.data} path={starship_link} />)}
            </div>
        </div>
    )
}

export default CharacterDetails;