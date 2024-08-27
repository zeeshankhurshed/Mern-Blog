import React, { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await loginUser(data).unwrap();
      const { user,token } = response;
      dispatch(setUser(user));
      alert("Login Successfully");
      navigate('/');
    } catch (error) {
      setMessage('Please provide a valid email and password');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className='flex flex-col items-center'>
          <RxAvatar className='text-4xl mb-4' />
          <h2 className='text-2xl font-semibold mb-6'>Sign In</h2>
          <form onSubmit={handleLogin} className='w-full flex flex-col space-y-4'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
              className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
              className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button 
              disabled={isLoading}
              type='submit'
              className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold'
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            {message && <p className='text-red-500 text-center'>{message}</p>}
            <p className='text-center text-sm'>
              Don't have an Account? 
              <Link className='text-blue-500 hover:underline' to={'/register'}>SignUp</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
