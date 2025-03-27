//with react package we need to import react and react-dom from node_module

import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Head from "./component/Head";
import Body from "./component/Body";
import About from "./component/About";
import Home from "./component/Home";
import Error from "./component/Error";
import {
    createBrowserRouter,
    RouterProvider, Outlet
} from "react-router-dom";

import "../index.css";

const Grocery = lazy(()=>import('./component/Grocery'));
const App = () => {
    return (<>
        <Head />
        <Outlet />
    </>)
}

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            }
            ,
            {
                path: '/grocery',
                element: <Suspense fallback={<h1>Loading...........</h1>}><Grocery /></Suspense>
            }
        ],

    },
    {
        path: '/feedback',
        element: <Body />
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
//root.render(<Head />);

// root.render(<Head />);