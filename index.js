//with react package we need to import react and react-dom from node_module

import React from "react";
import ReactDOM from "react-dom/client";


// const createElement = React.createElement('h1',{},'first React app');
const jsxElement = <h1>First React App</h1>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(jsxElement);
//root.render(createElement);