import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Feature = () => {
  return (
    <>
        <div>
            <h1 className='font-bold text-center p-8'>Features</h1>
            <ul className='flex'>
                
               
                <li className='px-10 text-xl'><Link to='/features/slide'>Slider</Link></li>
                <li className='px-10 text-xl'><Link to='/features/code-review'>Code Review Feedback</Link></li>
                <li className='px-10 text-xl'><Link to='/features/slide'>Slide2</Link></li>
                <li className='px-10 text-xl'><Link to='/features/slide'>Slide3</Link></li>
                 
            </ul>

            <Outlet />
        </div>
    </>
  )
}

export default Feature
