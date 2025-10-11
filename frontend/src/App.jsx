import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from "./context/authContext"; 
import { BarChart3, TrendingUp, TrendingDown, PieChart, Settings } from 'lucide-react';

import Header from './components/Header';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import EditTransactionPage from "./pages/EditTransactionPage";

const AppLayout = () => {
    const { user } = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);
    
    const theme = {
        bg: 'bg-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
        cardBg: 'bg-white dark:bg-slate-800/40',
        cardBorder: 'border-slate-200 dark:border-teal-500/20',
        glass: 'backdrop-blur-xl bg-white/80 dark:bg-slate-800/10',
        text: 'text-slate-800 dark:text-gray-200',
        mutedText: 'text-slate-500 dark:text-gray-400'
    };
    
    const mainContentBg = user ? theme.bg : 'dark:bg-slate-900 bg-slate-100';

    return (
        <div className={`min-h-screen ${theme.text} ${mainContentBg} transition-all duration-300 font-sans`}>
            <Header 
                darkMode={darkMode} setDarkMode={setDarkMode}
                sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
                theme={theme}
            />
            <div className="flex">
                {user && (
                    <aside className={`fixed lg:sticky top-0 left-0 h-screen ${theme.glass} border-r ${theme.cardBorder} transition-all duration-300 z-30 ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}>
                        <nav className="p-4 pt-24 space-y-2">
                            {[
                                { icon: <BarChart3 size={20} />, label: 'Dashboard' },
                                { icon: <TrendingUp size={20} />, label: 'Income' },
                                { icon: <TrendingDown size={20} />, label: 'Expenses' },
                                { icon: <PieChart size={20} />, label: 'Analytics' },
                                { icon: <Settings size={20} />, label: 'Settings' },
                            ].map((item) => (
                                <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${item.label === 'Dashboard' ? `bg-teal-500 text-white` : `${theme.cardBg} hover:opacity-80`}`}>
                                    {item.icon}
                                    <span className={sidebarOpen ? 'block' : 'lg:hidden'}>{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>
                )}
                <main className="flex-1">
                    <Routes>
                        <Route path="/login" element={<PublicRoute><LoginPage theme={theme} /></PublicRoute>} />
                        <Route path="/signup" element={<PublicRoute><SignupPage theme={theme} /></PublicRoute>} />
                        <Route path="/" element={<PrivateRoute><DashboardPage theme={theme} /></PrivateRoute>} />
                        <Route path="/edit/:id" element={<PrivateRoute><EditTransactionPage theme={theme} /></PrivateRoute>} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};
const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" /> : children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;






/* import React, { useContext } from "react";
import {  BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from "./context/authContext";

import Header from './components/Header';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import EditTransactionPage from "./pages/EditTransactionPage";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If there is a user, render the children components (the protected page).
  // Otherwise, redirect them to the login page.
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // If a user is logged in, redirect them away from login/signup to the dashboard
  return user ? <Navigate to="/" /> : children;
};

function App() {
   
  return(
      
    <Router>
      <AuthProvider>
      <Header/>
      <main style={{ padding: '20px' }}>
        <Routes>
        <Route path = "/login" element={ <PublicRoute><LoginPage/></PublicRoute> }/>
        <Route path = "/signup" element={ <PublicRoute><SignupPage/></PublicRoute> } />
        <Route path = "/" element={ <PrivateRoute> <DashboardPage/> </PrivateRoute> }/>
        <Route 
          path="/edit/:id" 
          element={
            <PrivateRoute>
            <EditTransactionPage />
            </PrivateRoute>
          }
        />       
        </Routes>
      </main> 
      </AuthProvider>
    </Router>
    
  );
}
export default App;
 */