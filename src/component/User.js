import React, { useState } from 'react'

const User = (props) => {
    const [count] = useState(0);
    const [count2] = useState(1);
    const { location } = props;
    return (
        <div className='fun-card'>
            <h6>Count:{count}</h6>
            <h6>Count2:{count2}</h6>
            <h3>User  function component</h3>
            <h3> name : {props.name}</h3>
            <h3>Loction:{location}</h3>
        </div>
    )
}

export default User