
import useResturant from './utils/useResturant';
import RestaurantCard, { withPromotedRestaurantCard } from './RestaurantCard';
import { Link } from 'react-router-dom';

const Home = () => {
    // const [data, setData] = useState([]);
    let [resturant] = useResturant();// custom hook

    let PromotedRestaurantCrad = withPromotedRestaurantCard(RestaurantCard);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         let res = await fetch('https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6217939&lng=77.33674979999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
    //         let data = await res.json();
    //         setData(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    //     }
    //    fetchData();
    //     return () => { }//cleanup function
    // }, [])



    return (
        <div>
            <div></div>
            <div className='flex flex-wrap ml-15'>
                {resturant?.length > 0 ? resturant.map((dat, i) => {
                    return (
                        // <div className='p-4 m-4 w-[250px] h-[400px] bg-green-50 border border-indigo-600 rounded-lg' key={dat?.info?.id} >
                        //     <img className='w-[250px]  rounded-lg' src={RES_IMG_BASE_URL + dat?.info?.cloudinaryImageId} />
                        //     <div className='mt-1 font-bold overflow-hidden  truncate' >{dat?.info?.name}</div>
                        //     {/* <h4>{dat?.info?.costForTwo}</h4> */}

                        //     <div className='text-black font-lg'><span>{'⭐' + dat?.info?.avgRating}</span>•<span>{dat?.info?.sla?.slaString}</span></div>

                        //     {/* <h4 className='color-grey-50' >{dat?.info?.cuisines?.join(', ')}</h4> */}
                        //     <div className='overflow-hidden  truncate text-gray-600' >{dat?.info?.cuisines?.join(', ')}</div>
                        //     <div className='overflow-hidden  truncate text-gray-600 mt'>{dat?.info?.locality}</div>
                        // </div>
                     <Link to={"restaurant/"+dat?.info?.id} key={dat?.info?.id}>   {dat?.info?.isOpen === false ? (<PromotedRestaurantCrad dat={dat} />) : (<RestaurantCard  dat={dat} />)} </Link>
                    )

                }) : 'No data'}

            </div>

        </div>
    )
}

export default Home