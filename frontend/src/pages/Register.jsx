import React, { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [registerUser,{isLoading}] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine first and last name to create a username
    const username = `${firstName} ${lastName}`;

    try {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        username, // Now you have a username
      };

      const response = await registerUser(newUser).unwrap();
      console.log(response);

      // Dispatch setUser action to store user data in Redux
      dispatch(setUser({ user: response.user }));
      alert('Successfully register the new user');
      setMessage('Registered Successfully');
      // Navigate to another page or show a success message
      navigate('/login'); // Adjust the route as needed
    } catch (error) {
      setMessage(error.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <RxAvatar className="text-4xl mb-4" />
          <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
          <form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              value={firstName}
              required
              placeholder="First Name..."
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="lastName"
              value={lastName}
              required
              placeholder="Last Name..."
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              value={email}
              required
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              value={password}
              required
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold">
              Sign Up
            </button>
            {message && <p className="text-red-500 text-center">{message}</p>}
            <p className="text-center text-sm">
              Already have an account? <Link className="text-blue-600 hover:underline" to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
