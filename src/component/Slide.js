import React, { useState, useEffect } from 'react';
import { data } from './utils/sliderData';

const Slide = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [activeNext, setActiveNext] = useState(true)
    const [activePrev, setActivePrev] = useState(false)

    const handleNext = () => {
        let lastSlide = data.length - 1;
        if (lastSlide > slideIndex) {
            setSlideIndex((prevValue) => prevValue + 1)
        }
    }


    const handlePrev = () => {
        if (slideIndex > 0) {
            setSlideIndex((prevValue) => prevValue - 1)
        }
    }

    const handleReset = () => {
        setSlideIndex(0);
    }

    useEffect(() => {
        setActivePrev(slideIndex > 0);
        setActiveNext(slideIndex < data.length - 1);

    }, [slideIndex, data.length])



    let buttonBackgroundNext = activeNext ? 'green' : 'gray';
    let buttonBackgroundPrev = activePrev ? 'green' : 'gray';

    return (
        <>
            <div className='m-10 ml-58'>
                <div className='m-10 w-6/12 '>
                    <button
                        className='cursor-pointer h-10 px-8 mx-10 border-2 border-amber-200'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        disabled={!activePrev}
                        style={{ backgroundColor: buttonBackgroundPrev }}
                        className='cursor-pointer  h-10 px-8 mx-10 border-2 border-amber-200'
                        onClick={handlePrev}
                    >
                        Prev
                    </button>
                    <button
                        disabled={!activeNext}
                        style={{ backgroundColor: buttonBackgroundNext }}
                        className='cursor-pointer  h-10 px-8 mx-10 border-2 border-amber-200'
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>

                <div className='flex mx-30 px-4'>
                    {/* {data?.map((item, index) => {
                        return (<>{index === slideIndex && <Slider key={item.id} title={item.title} />}</>)
                    })} */}


                    {data?.[slideIndex] && (
                        <Slider key={data[slideIndex].id} title={data[slideIndex].title} />
                    )}

                </div>
            </div>
        </>
    )
}

export default Slide


const Slider = ({ title }) => {
    return (
        <>
            <div className='w-4/12 h-50 border-2 px-4 shadow-2xl shadow-neutral-500 border-lime-50 rounded-xl'>
                <h1 className='font-bold text-2xl text-center pt-4'>{title}</h1>
            </div>

        </>)
}