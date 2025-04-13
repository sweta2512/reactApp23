// LoginForm.js
import React, { useState } from 'react';

export const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(email); // integration point
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='m-7 border-2 border-fuchsia-400'
      />
      <button type="submit" className='p-2 border-7 border-amber-100'>Login</button>
      {success && <p>Welcome!</p>}
    </form>
  );
};
