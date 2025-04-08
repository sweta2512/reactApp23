import React, { useState } from 'react';
import useRestaurantDetail from './utils/useRestaurantDetail';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import ResturantCategory from './ResturantCategory';

const RestaurantInfo = () => {
  const [showItem, setShowItem] = useState(0);
  const [shoWList, setShowList] = useState(null);
  const [show, setShow] = useState(false);
  const { resId } = useParams();
  const restaurantDetail = useRestaurantDetail(resId);

  const handleAccordin = (index) => {
    setShowList(shoWList === index ? null : index);
    setShow(true)

  }
  return (
    <div>
      <div>
        {restaurantDetail ? restaurantDetail.map((item, index) => {
          return (

            //in this case same state i shared with all the component
            // <div className='w-6/12 flex-1/6  border-2 border-gray-400  rounded-lg shadow-md m-auto mt-7 h-auto' key={index} onClick={handleAccordin}>
            // {/* <div className='w-6/12 flex-1/6  border-2 border-gray-400  rounded-lg shadow-md m-auto mt-7 h-auto' key={index} onClick={() => handleAccordin(index)}> */}
            //   <div className='flex justify-between mx-6 m-4'>
            //     <span className='text-bold'>
            //       Resturant
            //     </span>
            //     <span>
            //       ⬇️
            //     </span>
            //   </div>

            //   {/* {shoWList === index &&
            //     <>
            //       testts

            //     </>
            //   } */}

            //   {show &&
            //     <>
            //       <ItemList/>

            //     </>
            //   }
            // </div>
            //in this case child component maintain their own state and update it as well
            <ResturantCategory key={index} showItem={index === showItem? true : false} setShowItem={()=>setShowItem(index)} />
            )
        }) : ''}
      </div>
    </div>
  )
}

export default RestaurantInfo