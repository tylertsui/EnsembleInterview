import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { film_link, character_link } from "../strings/String";
import LinkBlock from "../common/LinkBlock";
import LinkBlockList from "../common/LinkBlockList";

const VehicleDetails = () => {

    const location = useLocation();
    const { toDisplay } = location.state;
    const vehicle = toDisplay;

    const [pilots, setPilots] = useState([]);
    const [films, setFilms] = useState([]);

    useEffect(()=> {
        let pilotPromises = vehicle.pilots.map((pilot) => {
            return axios.get(pilot);
        });

        let filmPromises = vehicle.films.map((film) => {
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
                Known Pilots : <LinkBlockList dataList={pilots} path={character_link} />
                {/* {
                    pilots.length > 0 ? (pilots.map((pilot, index) => {
                        return <LinkBlock key={index} data={pilot} path={character_link} name={pilot.name} />
                    })) : <div>NA</div>} */}
            </div>
            <div>
                Film Appearances: {
                    films.length > 0 ? (films.map((film, index) => {
                        return <LinkBlock key={index} data={film} path={film_link} name={film.title} />
                    })) : <div>NA</div>}
            </div>
        </div>
    )
}

export default VehicleDetails;