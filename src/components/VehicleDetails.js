import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { character_link } from "../strings/String";
import FilmBlockList from "../common/FilmBlockList";
import LinkBlockList from "../common/LinkBlockList";


// Organizes and displays Vehicle objects
const VehicleDetails = () => {

    const location = useLocation();
    const { toDisplay } = location.state;
    const vehicle = toDisplay;

    const [pilots, setPilots] = useState({loading: true, data: []});
    const [films, setFilms] = useState({loading: true, data: []});

    useEffect(()=> {
        let pilotPromises = vehicle.pilots.map((pilot) => {
            return axios.get(pilot);
        });

        let filmPromises = vehicle.films.map((film) => {
            return axios.get(film);
        });

        axios.all(pilotPromises).then((results) => {
            setPilots({
                data: results.map((result) => {
                    return result.data;
                }),
                loading: false
            });
        });

        axios.all(filmPromises).then((result) => {
            setFilms({
                data: result.map((film) => {
                    return film.data;
                }),
                loading: false
            });
        });
    }, []);

    return (
        <div>
            <div>
                Name: {vehicle.name}
            </div>
            <div>
                Class: {vehicle.vehicle_class}
            </div>
            <div>
                Model: {vehicle.model}
            </div>
            <div>
                Passengers: {vehicle.passengers}
            </div>
            <div>
                Cargo Capacity: {vehicle.cargo_capacity}
            </div>
            <div>
                Crew: {vehicle.crew}
            </div>
            <div>
                Cost In Credits: {vehicle.cost_in_credits}
            </div>
            <div>
                Manufacturer: {vehicle.manufacturer}
            </div>
            <div>
                Max Atmosphering Speed: {vehicle.max_atmosphering_speed}
            </div>
            <div>
                <h5>Known Pilots:</h5> {pilots.loading == true ? (<div>Loading</div>) : (<LinkBlockList dataList={pilots.data} path={character_link} />)}
            </div>
            <div>
                <h5>Film Appearances:</h5> {films.data == true ? (<div>Loading</div>) : (<FilmBlockList dataList={films.data} />)}
            </div>
        </div>
    )
}

export default VehicleDetails;