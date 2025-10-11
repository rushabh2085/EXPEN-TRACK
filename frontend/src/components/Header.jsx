import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
};

const Header = ({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen, theme }) => {
    const { user, logout } = useContext(AuthContext);

    // If there's no user (on login page), render a simple header
    if (!user) {
        return (
            <header className="dark:bg-slate-900 bg-slate-100 border-b dark:border-teal-500/20 border-slate-200">
                <div className="flex items-center justify-between px-4 sm:px-6 py-3">
                    <h1 className="text-xl sm:text-2xl font-bold">FinTrack</h1>
                </div>
            </header>
        );
    }

    // If a user is logged in, render the full dashboard header
    return (
        <header className={`${theme.glass} border-b ${theme.cardBorder} sticky top-0 z-40`}>
            <div className="flex items-center justify-between px-4 sm:px-6 py-3">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-lg ${theme.cardBg} hover:bg-slate-200 dark:hover:bg-teal-500/20 transition-colors lg:hidden`}>
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold">FinTrack</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${theme.cardBg} hover:bg-slate-200 dark:hover:bg-teal-500/20 transition-colors`}>
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="text-right hidden sm:block">
                        <p className={`text-sm ${theme.mutedText}`}>{getGreeting()},</p>
                        <p className="font-semibold">{user.name}</p>
                    </div>
                    <button onClick={logout} className={`p-2 rounded-lg ${theme.cardBg} hover:bg-red-500/20 transition-colors`}>
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;




/* import React, {useContext} from 'react';
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
export default Header; */