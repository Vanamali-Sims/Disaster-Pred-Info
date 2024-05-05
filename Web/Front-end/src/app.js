import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import MapComponent from "./components/MapComponent";
import Error from "./components/Error";
import Contact from "./components/Contact";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ForestFires from "./components/ffdetection";
import { News, Climate } from "./components/News";
import Test from "./components/Test";
import { Profile } from "./components/Profile";
import EarthQuakes from "./components/eqdetection";
import { Display } from "./components/Display";


const AppLayout = () => {
    return(
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

const appRouter = createBrowserRouter([
    {
        path : '/',
        element : <AppLayout />,
        errorElement : <Error />,
        children : [
            {
                path : '/',
                element : <Body />,
            },
            {
                path : '/about',
                element : <About />,
            },
            {
                path : 'forestfires',
                element : <ForestFires />
            },
            {
                path : 'earthquakes',
                element : <EarthQuakes />
            },
            {
                path : '/contact',
                element : <Contact />,
            },
            {
                path : '/nd',
                element : <News />,
            },
            {
                path : '/climate',
                element : <Climate />,
            },
        ]
    },
    {
        path : '/signup',
        element : <Test />,
    },
    {
        path : '/profile',
        element : <Profile />,
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);