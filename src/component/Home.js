import React, {useEffect, useState } from 'react';
import{RES_IMG_BASE_URL} from '../component/utils/constant'

const Home = () => {  
    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchData= async ()=>{
            let res = await fetch('https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6217939&lng=77.33674979999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
            let data = await res.json();
            setData(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        }
        fetchData();
        return ()=>{}//cleanup function
    },[])



    return (
        <div>
            <div></div>
            <div className='restCard'>
                {data?.length > 0 ? data.map((dat,i)=>{console.log(dat)
                    return(<div className='cards'>
                        <img className='resimg' src={RES_IMG_BASE_URL+dat?.info?.cloudinaryImageId}/>
                    <h4>{dat?.info?.name}</h4>
                    {dat?.info?.costForTwo}<br></br>

                    {dat?.info?.avgRating}<br></br><br></br>

                    {dat?.info?.cuisines?.join(', ')}
                    </div>)
                }):'No data'}
                
            </div>
            
        </div>
    )
}

export default Home