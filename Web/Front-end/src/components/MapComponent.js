import { useEffect } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { Display } from "./Display";

const MapComponent = () => {
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoieWFzd2FudGgxMjU4IiwiYSI6ImNsdHMzam5qbTBmcGEya3A3cDdlcnVjemMifQ.CSofx1vHzmd31RkglwMrFg';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
        });

        const lat = localStorage.getItem("lat");
        const lon = localStorage.getItem("lon");

        if (lat && lon) {
            new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);

            map.setCenter([lon, lat]);
            map.setZoom(2);
        }


        return () => {
            map.remove(); // Cleanup function to remove the map when the component unmounts
        };
    }, []); // Run this effect only once on component mount

    return (
        <div className="flex p-6 pl-64">
            <div id='map' style={{ width: '50%', height: '600px' }}></div>
                <Display />
        </div>
    ); 
}


export default MapComponent;
