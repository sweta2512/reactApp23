import React, {useEffect, useState, useLayoutEffect} from 'react'

const Head = () => {
    const [text, setText]= useState('')
    const [text2, setText2]= useState('')
    console.log('RENDER')
   useEffect(()=>{
    setText('textttt')
   },[])

   useLayoutEffect(() => {
    setText2('textttt22222')
    console.log('useLayoutEffect')
   },[])
    return (
        <div className='head'>Head {text}
        <ul className='headList'>
            <li>Home</li>
            <li>About </li>
            <li>Contact us</li>
            <li>Feedback</li>
           
        </ul>
        
        </div>
    )
}

export default Head


// export default function Head() {
//     return <h1>Header Content</h1>;
//   }
