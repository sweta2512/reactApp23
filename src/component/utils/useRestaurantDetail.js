import { useEffect, useState } from "react";
import { RESTAURANT_DETAIL } from "./constant";

const useRestaurantDetail = (resId) => {
    const [restaurantDetail, setRestarantDetail] = useState([]);
    useEffect(() => {
        fetchData();
    }, [resId]);

    const fetchData = async () => {
        const data = await fetch('https://cors-anywhere.herokuapp.com/' + RESTAURANT_DETAIL + resId + '&catalog_qa=undefined&submitAction=ENTER');
        //const data = await fetch('https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6217939&lng=77.33674979999999&restaurantId=253738&catalog_qa=undefined&submitAction=ENTER');
        const json = await data.json();
        setRestarantDetail(json?.data?.cards);
    }
    return restaurantDetail;
}

export default useRestaurantDetail;