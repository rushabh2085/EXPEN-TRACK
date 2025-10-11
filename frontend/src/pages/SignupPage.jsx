import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout'; // 1. Import the reusable layout

const SignupPage = () => {
  // We now need a state for the user's name
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = 'http://localhost:5001/api/auth/register';
      // Include the name in the user data payload
      const userData = { name, mobileNumber, password };
      await axios.post(url, userData);
      alert('Registration successful! Please log in.');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // 2. Wrap everything in the AuthLayout
    <AuthLayout title="Create Your Account">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg">{error}</p>}
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            placeholder='Enter your full name'
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
          <input
            type="tel"
            placeholder='Enter your 10 digit mobile number'
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type='password'
            placeholder='Create a password'
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold text-white transition-colors disabled:opacity-50" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

      </form>
      <p className="text-center text-gray-400 mt-6">
        Already have an account? 
        <Link to="/login" className="font-medium text-teal-400 hover:underline ml-1">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;

