import React from "react";
import { Link } from "react-router-dom";

const LinkBlock = ({data, path, name}) => {

    return (
        <div>
            <Link className="link" to={{
                pathname: path,
                state: {
                    toDisplay: data,
                },
            }}>{name}</Link>
        </div>
    )
}

export default LinkBlock;