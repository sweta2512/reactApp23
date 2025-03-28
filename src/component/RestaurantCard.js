import React from 'react';
import { RES_IMG_BASE_URL } from '../component/utils/constant';


const RestaurantCard = ({ dat }) => {


    return (
        <div className='p-4 m-4 w-[250px] h-[400px] bg-green-50 border border-indigo-600 rounded-lg' >
            <img className='w-[250px]  rounded-lg' src={RES_IMG_BASE_URL + dat?.info?.cloudinaryImageId} />
            <div className='mt-1 font-bold overflow-hidden  truncate' >{dat?.info?.name}</div>
            {/* <h4>{dat?.info?.costForTwo}</h4> */}

            <div className='text-black font-lg'><span>{'⭐' + dat?.info?.avgRating}</span>•<span>{dat?.info?.sla?.slaString}</span></div>

            {/* <h4 className='color-grey-50' >{dat?.info?.cuisines?.join(', ')}</h4> */}
            <div className='overflow-hidden  truncate text-gray-600' >{dat?.info?.cuisines?.join(', ')}</div>
            <div className='overflow-hidden  truncate text-gray-600 mt'>{dat?.info?.locality}</div>
        </div>)

}

export default RestaurantCard

//higher order component // takes a componet as input and modified it and return a modified component
export const withPromotedRestaurantCard = (RestaurantCard) => {
    return ({dat}) => {
        return (<>
            <span>Promoted</span>
            <RestaurantCard dat={dat}/>
        </>)
    }
}