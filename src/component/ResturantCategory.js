import React,{useState} from 'react'
import ItemList from './ItemList'

const ResturantCategory = ({showItem, setShowItem}) => {
    //const [showItem, setShowItem] = useState(false);
    const handleClick =()=>{
        setShowItem()
    }
    return (
        <div className='w-6/12 flex-1/6  border-2 border-gray-400  rounded-lg shadow-md m-auto mt-7 h-auto' onClick={handleClick}>
            {/* <div className='w-6/12 flex-1/6  border-2 border-gray-400  rounded-lg shadow-md m-auto mt-7 h-auto' key={index} onClick={() => handleAccordin(index)}> */}
            <div className='flex justify-between mx-6 m-4'>
                <span className='text-bold'>
                    Resturant     
                </span>
                <span>
                    ⬇️
                </span>
            </div>

            {/* {shoWList === index &&
        <>
          testts

        </>
      } */}

            {showItem &&
                <>
                    <ItemList />

                </>
            }
        </div>
  )
}

export default ResturantCategory