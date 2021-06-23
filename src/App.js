import React from "react";
import { render } from "react-dom";

import Films from "./Films";

const App = () => {
    return (
        <div>
            <p>Star Wars!</p>
            <Films />
        </div>
    )
};

render(<App />, document.getElementById("root"));