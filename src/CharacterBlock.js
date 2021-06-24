import React from "react";
import { Link } from "react-router-dom";

const CharacterBlock = ({char}) => {

    return (
        <div>
            <Link className="link" to={{
                pathname: "/character/",
                state: {
                    charDisplay: char,
                },
            }} key={char.name}>{char.name}</Link>
        </div>
    )
}

export default CharacterBlock;