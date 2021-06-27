import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

import { character_link } from "../strings/String";
import LinkBlockList from "../common/LinkBlockList";

const FilmCharacters = () => {

    const location = useLocation();
    const { characters, title } = location.state;

    const [names, setNames] = useState([]);

    useEffect(() => {
        let characterPromises = characters.map((char) => {
            return axios.get(char);
        });

        axios.all(characterPromises).then((result) => {
            setNames(result.map((char) => {
                return char.data;
            }));
        });

    }, []);

    return (
        <div>
            <h5>Character Featured in {title}:</h5>
            <br />
            <LinkBlockList dataList={names} path={character_link} />
        </div>
    )
}

export default FilmCharacters;