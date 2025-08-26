import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styles from './SignupPage.module.css'

const SignupPage = () => {

  const [name,setName] = useState('');
  const [mobileNumber,setMobileNumber] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('');

  const handleSubmit =  async (event) => {

    event.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      
      const url = 'http://localhost:5000/api/auth/register'

      const userData = {
        name,
        mobileNumber,
        password,
      };

      const response = await axios.post(url, userData);
      setSuccess(response.data.message);

    }catch(err) {

      console.log('Error received from backend:', err.response);

      if (err.response && err.response.data && err.response.data.message) {
        // If the server sent a specific message (like our validation error), use it.
        setError(err.response.data.message);
      } else {
        // This handles cases where no response was received (e.g., network error, CORS issue).
        setError('Cannot connect to the server. Please try again later.');
        console.error('Axios request failed:', err); // Log the full error for debugging.
      }
    } finally {
      // The 'finally' block runs whether the try or catch block succeeded.
      // This is the perfect place to stop the loading indicator.
      setLoading(false);
    }

      /* if(err.response && err.response.data && err.response.data.message){
        setError(error.response.data.message);
      }else {
        setError('Registration Failed.Please try again.');
      }
      setLoading(false); */
    
  };

  return(
    <div className={styles.container}>
      <h2 className={styles.title}>Create Your Account</h2>

      <form onSubmit={handleSubmit}>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{success}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor='name' className={styles.label}>
            Name
          </label>
          <input
          type="name"
          id="name"
          placeholder='Enter your name'
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        </div>

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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

      </form>
      <p className={styles.loginLink}>Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;


