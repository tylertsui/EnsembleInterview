import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

import { character_link } from "./String";
import LinkBlock from "./LinkBlock";

const FilmCharacters = () => {

    const location = useLocation();
    const { characters, title } = location.state;

    const [name, setName] = useState([]);

    useEffect(() => {
        let characterPromises = characters.map((char) => {
            return axios.get(char);
        });

        axios.all(characterPromises).then((result) => {
            setName(result.map((char) => {
                return char.data;
            }));
        });

    }, []);

    return (
        <div>
            Character Featured in {title}:
            <br />
            {name.length > 0 ? (name.map((char, index) => {
                return <LinkBlock key={index} data={char} path={character_link} name={char.name} />
            })) : <div>NA</div>}
        </div>
    )
}

export default FilmCharacters;