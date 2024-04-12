import React from 'react'
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit (event) {
    event.preventDefault();
  }

  return (
    <div className='modal-screen visible'>
      <form action="" className='modal' style={{ backgroundColor: 'lightgray', height: '50vh', display: 'flex', gap: '2vw', alignItems: 'center', borderRadius: '12px' }} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <label htmlFor="email">Email</label>
          <input type="text" placeholder='Enter email' onChange={e => setEmail(e.target.value)} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='Enter password' onChange={e => setPassword(e.target.value)} />
        </div>

        <button>Log in</button>
      </form>
    </div>
  )
}

export default Login;