import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { film_endpoint } from "./String";
import FilmBlock from "./FilmBlock";
import FilmDetails from "./FilmDetails";
import CharacterDetails from "./CharacterDetails";


const App = () => {
    const [films, setFilms] = useState([{title: ""}]);

    useEffect(() => {
        axios.get(`${film_endpoint}`).then((e) => {
            setFilms(e.data.results);
        });
    }, []);

    return (
        <div>
            <Router>
                <Link to="/">
                    <p>Star Wars!</p>
                </Link>
                <Switch>
                    <Route path="/character/" children={<CharacterDetails />}/>
                    <Route path="/details/" children={<FilmDetails />} /> 
                    
                    <Route path="/">
                        {films.map((film) => {
                            return <FilmBlock film={film} />
                        })}
                    </Route>
                </Switch>
            </Router>
        </div>
    )
};

render(<App />, document.getElementById("root"));