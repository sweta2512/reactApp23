import React,{useState, useEffect } from 'react'

const Body = () => {
  const [image, setImage] = useState('')
  useEffect(() => {
      fetchData();
      return () => { }
  }, [])

  const fetchData = async () => {
      let data = await fetch('https://staging.lfcoin.io/api/stories/get-all');
      let res = await data.json();
      setImage(res?.data);
  }
  return (
    <div>
      <div>
        <div>
          {image?.length > 0 ? image?.map((da, index) => {
            return (
              <img className='apiImage' key={da._id} src={'https://staging.lfcoin.io/api/' + da?.thumbnailImage} loading="lazy" />
            )
          }) : 'no image'}
        </div>
      </div>
    </div>
  )
}

export default Body