import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

import CharacterBlock from "./CharacterBlock";

const FilmDetails = () => {

    const [name, setName] = useState([{name: ""}]);
    const location = useLocation();
    const { toDisplay } = location.state;
    const film = toDisplay;

    useEffect(() => {
        let character = film.characters.map((char) => {
            return axios.get(char);
        });
        axios.all(character).then((result) => {
            setName(result.map((char) => {
                return char.data;
            }));
        });
    }, []);

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
                {name.map((char) => {
                    return <CharacterBlock char={char} />
                })}
            </div>
        </div>
    )
};

export default FilmDetails;