import React from 'react'

const Contact = () => {
    return (
        <div><h1 className='my-5 font-bold text-center'>Contact</h1>
            <div className=' w-6/12 m-auto flex-2 flex-column border '>
                <div className='flex'>
                    <label>Name</label>
                    <input className='border' type='text' />
                </div>
                <div className=' my-5 w-200 '>
                    <label>Email</label>
                    <input className='border border-black p-2' type='text' />
                </div>
                <div className='my-5 flex w-100'>
                    <label>Query</label>
                    <textarea className='border border-black p-2' defaultValue='this is text area'/> 
                </div>
            </div>
        </div>
    )
}

export default Contact