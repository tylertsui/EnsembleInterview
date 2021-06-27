import React from "react";

import LinkBlock from "./LinkBlock";
import { film_link } from "../strings/String";

const FilmBlockList = ({dataList}) => {
    return (
        dataList.length > 0 ? (dataList.map((data, index) => {
            return <LinkBlock key={index} data={data} path={film_link} name={data.title} />
        })) : <div>NA</div>
    )
}

export default FilmBlockList;