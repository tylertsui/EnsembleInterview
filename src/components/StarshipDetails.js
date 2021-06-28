import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { character_link } from "../strings/String";
import FilmBlockList from "../common/FilmBlockList";
import LinkBlockList from "../common/LinkBlockList";


// Organizes and displays Starship objects
const StarshipDetails = () => {

    const location = useLocation();
    const { toDisplay } = location.state;
    const starship = toDisplay;

    const [pilots, setPilots] = useState([]);
    const [films, setFilms] = useState([]);

    useEffect(()=> {
        let pilotPromises = starship.pilots.map((pilot) => {
            return axios.get(pilot);
        });

        let filmPromises = starship.films.map((film) => {
            return axios.get(film);
        });

        axios.all(pilotPromises).then((results) => {
            setPilots(results.map((result) => {
                return result.data;
            }));
        });

        axios.all(filmPromises).then((results) => {
            setFilms(results.map((result) => {
                return result.data;
            }));
        });
    }, []);

    return (
        <div>
            <div>
                Name: {starship.name}
            </div>
            <div>
                Model: {starship.model}
            </div>
            <div>
                Class: {starship.starship_class}
            </div>
            <div>
                Crew: {starship.crew}
            </div>
            <div>
                Cargo Capacity:{starship.cargo_capacity}
            </div>
            <div>
                Manufacturer: {starship.manufacturer}
            </div>
            <div>
                Max Atmosphering Speed: {starship.max_atmoshpering_speed}
            </div>
            <div>
                Length: {starship.length}
            </div>
            <div>
                Passengers: {starship.passengers}
            </div>
            <div>
                Cost in Credits: {starship.cost_in_credits}
            </div>
            <div>
                <h5>Known Pilots:</h5> <LinkBlockList dataList={pilots} path={character_link} />
            </div>
            <div>
                <h5>Film Appearances:</h5> <FilmBlockList dataList={films} />
            </div>
        </div>
    )
}

export default StarshipDetails;