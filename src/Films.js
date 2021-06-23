import React, { useState } from "react";
import axios from "axios";

import { api_url, film_endpoint } from "./String";
import FilmBlock from "./FilmBlock";

const Films = () => {
    const [films, setFilms] = useState([{title: ""}]);

    axios.get(`${api_url}${film_endpoint}`).then((e) => {
        setFilms(e.data.results);
    });

    return (
        <div>
            {films.map((film, index) => {
                return <FilmBlock title={film.title} index={index} />
            })}
        </div>
    )
}

export default Films;