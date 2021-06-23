import React, { useState } from "react";

const SearchBar = () => {
    const [query, setQuery] = useState("Star Wars");
    
    return (
        <div id="search-param">
            <form onSubmit="">
                <label htmlFor="search-bar">
                    Search: 
                    <input type="text" id="search-bar" value={query} onChange={e => setQuery(e.target.value)}></input>
                </label>
                <input type="submit"></input>
            </form>            
        </div>
    )
};

export default SearchBar;