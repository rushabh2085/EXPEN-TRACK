import React, {useContext} from 'react';
import {AuthContext} from '../context/authContext';
import styles from './Header.module.css'

const getGreeting = () => {
    const hour = new Date().getHours();
    if( hour < 12 ) {
        return 'Good Morning';
    }else if( hour < 18 ) {
        return 'Good Afternoon';
    }else {
        return 'Good Evening';  
    }
};

const Header = () => {

    const { user, logout } = useContext(AuthContext);
    const greeting = getGreeting();

     return (
        <header className= {styles.header}>
            <div className= {styles.container}>
                <h1 className= {styles.logo}>Expense Tracker</h1>
                <div className={styles.userInfo}>
          {user ? (
            <>
              <p className={styles.greeting}>{greeting}, {user.name}!</p>
              <button onClick={logout} className={styles.logoutButton}>Logout</button>
            </>
          ) : (
            <p className={styles.greeting}>{greeting}!</p>
          )}
            </div>
            </div>
        </header>
     );
};
export default Header;