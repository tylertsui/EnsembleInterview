import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { film_endpoint, film_link } from "./String";
import FilmDetails from "./FilmDetails";
import CharacterDetails from "./CharacterDetails";
import WorldDetails from "./WorldDetails";
import SpecieDetails from "./SpecieDetails";
import VehicleDetails from "./VehicleDetails";
import LinkBlock from "./LinkBlock";

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
                    <Route path="/film/" children={<FilmDetails />} /> 
                    <Route path="/world/" children={<WorldDetails />} />
                    <Route path="/specie/" children={<SpecieDetails />} />
                    <Route path="/vehicle/" children={<VehicleDetails />} />
                    <Route path="/">
                        {films.map((film, index) => {
                            return <LinkBlock key={index} data={film} path={film_link} name={film.title} />
                        })}
                    </Route>
                </Switch>
            </Router>
        </div>
    )
};

render(<App />, document.getElementById("root"));