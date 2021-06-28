import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { character_link, world_link } from "../strings/String";
import LinkBlock from "../common/LinkBlock";
import FilmBlockList from "../common/FilmBlockList";
import LinkBlockList from "../common/LinkBlockList";


// Organizes and displays Specie objects
const SpecieDetails = () => {

    const location = useLocation();
    const { toDisplay } = location.state;
    const specie = toDisplay;

    const [films, setFilms] = useState({loading: true, data: []});
    const [characters, setCharacters] = useState({loading: true, data: []});
    const [homeworld, setHomeworld] = useState({loading: true, data: []});
    
    useEffect(() => {
        let filmPromises = specie.films.map((film) => {
            return axios.get(film);
        });

        let characterPromises = specie.people.map((character) => {
            return axios.get(character);
        });

        axios.all(filmPromises).then((result) => {
            setFilms({
                data: result.map((film) => {
                    return film.data;
                }),
                loading: false
            });
        });

        axios.all(characterPromises).then((result) => {
            setCharacters({
                data: result.map((character) => {
                    return character.data;
                }),
                loading: false
            });
        });

        axios.get(specie.homeworld).then((result) => {
            setHomeworld({
                data: result.data,
                loading: false
            });
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
                <h5>Film Appearances: </h5> {films.loading == true ? (<div>Loading</div>) : (<FilmBlockList dataList={films.data} />)}
            </div>
            <div>
                <h5>Home World:</h5> {homeworld.loading == true ? (<div>Loading</div>) : (
                    homeworld.data.length > 0 ? (<LinkBlock data={homeworld.data} path={world_link} name={homeworld.data.name} />) : (<div>NA</div>)
                )}
            </div>
            <div>
                <h5>Members of Species:</h5> {characters.loading == true ? (<div>Loading</div>) : (<LinkBlockList dataList={characters.data} path={character_link} />)}
            </div>
        </div>
    )
}

export default SpecieDetails;