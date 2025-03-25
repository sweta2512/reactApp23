import React, { useEffect, useState, useLayoutEffect } from 'react';
import { LOGO } from './utils/constant';
import { Link } from "react-router-dom";


const Head = () => {
    const [text, setText] = useState('')
    const [text2, setText2] = useState('')
    console.log('RENDER')
    useEffect(() => {
        setText('textttt')
    }, [])



    useLayoutEffect(() => {
        setText2('textttt22222')
        console.log('useLayoutEffect')

        
        return () => { }
    }, [])



    return (
        <div className='head'>
            <img src={LOGO} className='logo' />
            <ul className='headList'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link> </li>
                <li><Link to='/contact'>Contact us</Link></li>
                <li>Feedback</li>

            </ul>

        </div>
    )
}

export default Head


// export default function Head() {
//     return <h1>Header Content</h1>;
//   }
