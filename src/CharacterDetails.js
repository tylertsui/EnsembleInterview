import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import FilmBlock from "./FilmBlock";

const CharacterDetails = () => {

    const location = useLocation();
    const { charDisplay } = location.state;

    const [films, setFilms] = useState([]);

    useEffect(() => {
        let appearances = charDisplay.films.map((film) => {
            return axios.get(film);
        });
        axios.all(appearances).then((result) => {
            setFilms(result.map((film) => {
                return film.data;
            }));
        });
    }, []);

    return (
        <div>
            <div>
                Name: {charDisplay.name}
            </div>
            <div>
                Birth Date: {charDisplay.birth_year}
            </div>
            <div>
                Eye Color: {charDisplay.eye_color}
            </div>
            <div>
                Gender: {charDisplay.gender}
            </div>
            <div>
                Hair Colour: {charDisplay.hair_color}
            </div>
            <div>
                Film Appearances: {films.map((film) => {
                    return <FilmBlock film={film} />
                })}
            </div>
        </div>
    );
}

export default CharacterDetails;