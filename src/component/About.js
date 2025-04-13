import React from 'react';
import User from './User';
import UserClass from './UserClass';
import { LoginForm } from './LoginForm';

const About = () => {
  return (
    <div>
      {/* <User name={'sweta'} location={'Shipra Suncity'}/>
      <UserClass name={'sweta' }  location={'Indrapuram'}/> */}
      <LoginForm onLogin={()=>{}} />
    </div>
  )
}

export default About