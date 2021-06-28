import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { film_link, character_link, world_link, specie_link,vehicle_link, starship_link, film_character_link, home_link } from "../strings/String";
import FilmDetails from "./FilmDetails";
import CharacterDetails from "./CharacterDetails";
import WorldDetails from "./WorldDetails";
import SpecieDetails from "./SpecieDetails";
import VehicleDetails from "./VehicleDetails";
import StarshipDetails from "./StarshipDetails";
import FilmCharacters from "./FilmCharacters";
import FilmDisplay from "./FilmDisplay";


// Driver for the App
const App = () => {

    return (
        <div>
            <Router>
                <Link to="/">
                    <p>Star Wars!</p>
                </Link>
                <Switch> {/* Ensures only first match is rendered */}
                    <Route path={film_character_link} children={<FilmCharacters />} />
                    <Route path={character_link} children={<CharacterDetails />}/> 
                    <Route path={film_link}children={<FilmDetails />} /> 
                    <Route path={world_link} children={<WorldDetails />} />
                    <Route path={specie_link} children={<SpecieDetails />} />
                    <Route path={vehicle_link} children={<VehicleDetails />} />
                    <Route path={starship_link} children={<StarshipDetails />} />
                    <Route path={home_link} children={<FilmDisplay />} />
                </Switch>
            </Router>
        </div>
    )
};

render(<App />, document.getElementById("root"));