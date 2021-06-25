import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

import { character_link, specie_link, world_link } from "./String";
import LinkBlock from "./LinkBlock";

const FilmDetails = () => {

    const [name, setName] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    
    const location = useLocation();
    const { toDisplay } = location.state;
    const film = toDisplay;

    useEffect(() => {
        let character = film.characters.map((char) => {
            return axios.get(char);
        });

        let worlds = film.planets.map((planet) => {
            return axios.get(planet);
        });

        let races = film.species.map((specie) => {
            return axios.get(specie);
        });

        axios.all(character).then((result) => {
            setName(result.map((char) => {
                return char.data;
            }));
        });

        axios.all(worlds).then((result) => {
            setPlanets(result.map((planet) => {
                return planet.data;
            }));
        });

        axios.all(races).then((result) => {
            setSpecies(result.map((specie) => {
                return specie.data;
            }));
        });
    }, []);

    console.log(species);
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
                Character:
                <br />
                {name.length > 0 ? (name.map((char, index) => {
                    return <LinkBlock key={index} data={char} path={character_link} name={char.name} />
                })) : <div>NA</div>}
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
        </div>
    )
};

export default FilmDetails;