import React, { useState , useContext } from 'react';
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
            const url = 'http://localhost:5000/api/auth/login';
            const userData = { mobileNumber, password };
            const response = await axios.post(url, userData);

            login(response.data.token);
            navigate('/');

            /* localStorage.setItem('authToken',response.data.token);
            console.log('Login Successfull! Token', response.data.token);

            alert('Login Successfull!'); */
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
export default LoginPage;