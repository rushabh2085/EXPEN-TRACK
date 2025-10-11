import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import axios from 'axios';
import AuthLayout from '../components/AuthLayout'; // 1. Import the new layout

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = 'http://localhost:5001/api/auth/login';
      const userData = { mobileNumber, password };
      const response = await axios.post(url, userData);
      login(response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // 2. Wrap the form in the new AuthLayout
    <AuthLayout title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg">{error}</p>}
        
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
            placeholder='Enter your password'
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold text-white transition-colors disabled:opacity-50" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>

      </form>
      <p className="text-center text-gray-400 mt-6">
        Don't have an account? 
        <Link to="/signup" className="font-medium text-teal-400 hover:underline ml-1">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;





/* import React, { useState , useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import axios from 'axios';
import styles from './SignupPage.module.css';


const LoginPage = () => {

    const[mobileNumber,setMobileNumber] = useState('');
    const[password,setPassword] = useState('');
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState('');

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const url = 'http://localhost:5001/api/auth/login';
            const userData = { mobileNumber, password };
            const response = await axios.post(url, userData);

            login(response.data.token);
            navigate('/');

        }catch (err) {

            if (err.response) {
        console.log('Backend Error Data:', err.response.data);
      }
            if(err.response && err.response.data) {
                setError(err.response.data.message || err.response.data.msg || 'An error occurred.');
            }else {
                setError('Login failed.Please try again later.');
            }
        }finally {
            setLoading(false);
        }
    };

 return(
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome Back!</h2>

      <form onSubmit={handleSubmit}>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor='mobile' className={styles.label}>
            Mobile Number
          </label>
          <input
          type="tel"
          id="mobile"
          placeholder='Enter your 10 digit mobile number'
          className={styles.input}
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='password' className={styles.label}>
            Password
          </label>
          <input
          type='password'
          id='password'
          placeholder='Enter your password'
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>

      </form>
      <p className={styles.loginLink}>Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};
export default LoginPage; */