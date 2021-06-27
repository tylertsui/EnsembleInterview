import React from "react";

import LinkBlock from "./LinkBlock";

const FilmBlockList = ({dataList, path}) => {
    return (
        dataList.length > 0 ? (dataList.map((data, index) => {
            return <LinkBlock key={index} data={data} path={path} name={data.title} />
        })) : <div>NA</div>
    )
}

export default FilmBlockList;