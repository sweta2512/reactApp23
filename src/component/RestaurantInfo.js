import React from 'react';
import useRestaurantDetail from './utils/useRestaurantDetail';
import { useParams } from 'react-router-dom';

const RestaurantInfo = () => {
    const {resId}= useParams();
    const restaurantDetail = useRestaurantDetail(resId);

    console.log(restaurantDetail,'restaurantDetail')
  return (
    <div>RestaurantInfo</div>
  )
}

export default RestaurantInfo