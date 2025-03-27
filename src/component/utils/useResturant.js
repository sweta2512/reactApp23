import { useState, useEffect } from "react";
const useResturant= ()=>{
    const [resturant, setResturant] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async ()=>{
        const data = await fetch('https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6217939&lng=77.33674979999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');

        const json = await data.json();
        setResturant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }


    return [resturant];
}

export default useResturant;