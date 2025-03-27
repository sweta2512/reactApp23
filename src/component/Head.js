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
        <div className='head'>
            <img src={LOGO} className='logo' />
            <ul className='headList'>
                <li>Online Status:{onlineStatus?'🟢':'🔴'}</li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link> </li>
                <li><Link to='/contact'>Contact us</Link></li>
                <li><Link to='/feedback'>Feedback</Link></li>
                <li><Link to='/grocery'>Grocery</Link></li>

            </ul>

        </div>
    )
}

export default Head


// export default function Head() {
//     return <h1>Header Content</h1>;
//   }
