import React from "react";
import { Link } from "react-router-dom";


// A Link template that contains the data queried in the router's state
const LinkBlock = ({data, path, name}) => {

    return (
        <Link className="link" to={{
            pathname: path,
            state: {
                toDisplay: data,
            },
        }}><button>{name}</button></Link>
    )
}

export default LinkBlock;