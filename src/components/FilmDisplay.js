import React, { useState, useEffect } from "react";
import axios from "axios";

import { film_endpoint, film_link } from "../strings/String";
import LinkBlock from "../common/LinkBlock";

const FilmDisplay = () => {

    const [display, setDisplay] = useState([]);
    const [query, setQuery] = useState("Star Wars");

    useEffect(() => {
        if (query == "Star Wars" || query =="") {
            axios.get(`${film_endpoint}`).then((e) => {
                setDisplay(e.data.results);
            });
        } else {
            axios.get(`${film_endpoint}?search=${query}`).then((e) => {
                setDisplay(e.data.results);
            });
        }

    }, [query]);

    return (
        <div>
            <div id="search-param">
                <form onSubmit="">
                    <label htmlFor="search-bar">
                        Search: 
                        <input type="text" id="search-bar" value={query} onChange={e => setQuery(e.target.value)}></input>
                    </label>
                </form>            
            </div>
            <div>
                {display.map((film, index) => {
                    return <LinkBlock key={index} data={film} path={film_link} name={film.title} />
                })}
            </div>
        </div>
    )
}

export default FilmDisplay;