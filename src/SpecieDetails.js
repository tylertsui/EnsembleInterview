import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { film_link, character_link, world_link } from "./String";
import LinkBlock from "./LinkBlock";

const SpecieDetails = () => {

    const location = useLocation();
    const { toDisplay } = location.state;
    const specie = toDisplay;

    const [films, setFilms] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [homeworld, setHomeworld] = useState([]);
    
    useEffect(() => {
        let filmPromises = specie.films.map((film) => {
            return axios.get(film);
        });

        let characterPromises = specie.people.map((character) => {
            return axios.get(character);
        });

        axios.all(filmPromises).then((result) => {
            setFilms(result.map((film) => {
                return film.data;
            }));
        });

        axios.all(characterPromises).then((result) => {
            setCharacters(result.map((character) => {
                return character.data;
            }));
        });

        axios.get(specie.homeworld).then((result) => {
            setHomeworld(result.data);
        });
    }, []);

    return (
        <div>
            <div>
                Specie: {specie.name}
            </div>
            <div>
                Average Height: {specie.average_height}
            </div>
            <div>
                Average Lifespan: {specie.average_lifespan}
            </div>
            <div>
                Classification: {specie.classifcation}
            </div>
            <div>
                Designation: {specie.designation}
            </div>
            <div>
                Possible Eye Colours: {specie.eye_colors}
            </div>
            <div>
                Possible Skin Colours: {specie.skin_colors}
            </div>
            <div>
                Language: {specie.language}
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
                Members of Species: {characters.length > 0 ? (characters.map((char, index) => {
                            return <LinkBlock key={index} data={char} path={character_link} name={char.name} />
                        })) : <div>NA</div>}

            </div>
        </div>
    )
}

export default SpecieDetails;