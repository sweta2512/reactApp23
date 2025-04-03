import React, { useEffect, useState, useLayoutEffect } from 'react';
import { LOGO } from './utils/constant';
import { Link } from "react-router-dom";
import useOnlineStatus from './utils/useOnlineStatus';


const Head = () => {
    const [text, setText] = useState('')
    const [text2, setText2] = useState('');
    const onlineStatus = useOnlineStatus();
    useEffect(() => {
        setText('textttt')
    }, [])



    useLayoutEffect(() => {
        setText2('textttt22222')    
        return () => { }
    }, [])



    return (
        <div className='flex justify-between bg-amber-100'>
            <img src={LOGO} className='w-29' />
            <div className='flex item-center'>
            <ul className='flex mt-10 mr-20'>
                <li className='pr-5'>Online Status:{onlineStatus?'🟢':'🔴'}</li>
                <li className='pr-5'><Link to='/'>Home</Link></li>
                <li className='pr-5'><Link to='/about'>About</Link> </li>
                <li className='pr-5'><Link to='/contact'>Contact us</Link></li>
                <li className='pr-5'><Link to='/feedback'>Feedback</Link></li>
                <li className='pr-5'><Link to='/grocery'>Grocery</Link></li>
                <li className='pr-5 text-bold' onClick={addCartHandler}>Cart</li>

            </ul>
            </div>
           

        </div>
    )
}

export default Head


// export default function Head() {
//     return <h1>Header Content</h1>;
//   }
