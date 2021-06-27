import React from "react";

import LinkBlock from "./LinkBlock";

const LinkBlockList = ({dataList, path}) => {
    return (
        dataList == "loading" ? (<h6>Loading</h6>) :
        (dataList.length > 0 ? (dataList.map((data, index) => {
            return <LinkBlock key={index} data={data} path={path} name={data.name} />
        })) : <div>NA</div>)
    )
}

export default LinkBlockList;