import React from "react";
import { Link } from "react-router-dom";

const FilmBlock = ({film}) => {

    return (
        <div>
            <Link className="link" to={{
                pathname: "/details/",
                state: {
                    toDisplay: film,
                },
            }} key={film.episode_id}>{film.title}</Link>
        </div>
    )
}

export default FilmBlock;