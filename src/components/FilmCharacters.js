import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

import { character_link } from "../strings/String";
import LinkBlockList from "../common/LinkBlockList";


// Displays all characters that appear in a certain film
const FilmCharacters = () => {

    const location = useLocation();
    const { characters, title } = location.state;

    const [names, setNames] = useState({loading: true, data: []});

    useEffect(() => {
        let characterPromises = characters.map((char) => {
            return axios.get(char);
        });

        axios.all(characterPromises).then((result) => {
            setNames({
                data: result.map((char) => {
                    return char.data;
                }),
                loading: false
            });
        });

    }, []);

    return (
        <div>
            <h5>Character Featured in {title}:</h5>
            <br />
            {names.loading == true ? (<div>Loading</div>) : (<LinkBlockList dataList={names.data} path={character_link} />)}
        </div>
    )
}

export default FilmCharacters;