import React from "react";

const FilmBlock = ({title, index}) => {

    return (
        <div>
            <a key={title} onClick={e => {console.log(index)}}>{title}</a>
        </div>
    )
}

export default FilmBlock;