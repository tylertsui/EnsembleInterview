import React from "react";

import LinkBlock from "./LinkBlock";


// Generates generic LinkBlock components using a List of objects
const LinkBlockList = ({dataList, path}) => {
    return (
        dataList.length > 0 ? (dataList.map((data, index) => {
            return <LinkBlock key={index} data={data} path={path} name={data.name} />
        })) : <div>NA</div>
    )
}

export default LinkBlockList;