import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from "./context/authContext"; 
import { BarChart3, TrendingUp, TrendingDown, Settings, Download } from 'lucide-react';

import Header from './components/Header';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import EditTransactionPage from "./pages/EditTransactionPage";

// Sidebar Component
const Sidebar = ({ sidebarOpen, setSidebarOpen, theme }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: <BarChart3 size={20} />, label: 'Dashboard', path: '/' },
        { icon: <TrendingUp size={20} />, label: 'Income', path: '/income' },
        { icon: <TrendingDown size={20} />, label: 'Expenses', path: '/expenses' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
        { icon: <Download size={20} />, label: 'Export', path: '/export' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            {/* Mobile Overlay - MUST be before sidebar in DOM but LOWER z-index */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-10 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - HIGHER z-index than overlay */}
            <aside className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] ${theme.glass} border-r ${theme.cardBorder} transition-all duration-300 z-20 ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}>
                <nav className="p-4 pt-8 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.label}
                                onClick={() => handleNavigation(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-teal-500 text-white' : `${theme.cardBg} hover:opacity-80`}`}
                            >
                                {item.icon}
                                <span className={sidebarOpen ? 'block' : 'lg:hidden'}>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

// Placeholder pages
const IncomePage = ({ theme }) => (
    <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Income Tracker</h2>
        <p className={theme.mutedText}>View and manage all your income sources here.</p>
    </div>
);

const ExpensesPage = ({ theme }) => (
    <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Expense Tracker</h2>
        <p className={theme.mutedText}>Track and categorize your expenses here.</p>
    </div>
);

const SettingsPage = ({ theme }) => (
    <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <p className={theme.mutedText}>Manage your account settings and preferences.</p>
    </div>
);

const ExportPage = ({ theme }) => (
    <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Export Data</h2>
        <p className={theme.mutedText}>Export your financial data to CSV or PDF.</p>
    </div>
);

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
                darkMode={darkMode} 
                setDarkMode={setDarkMode}
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                theme={theme}
            />
            <div className="flex">
                {user && (
                    <Sidebar 
                        sidebarOpen={sidebarOpen} 
                        setSidebarOpen={setSidebarOpen}
                        theme={theme}
                    />
                )}
                <main className="flex-1">
                    <Routes>
                        <Route path="/login" element={<PublicRoute><LoginPage theme={theme} /></PublicRoute>} />
                        <Route path="/signup" element={<PublicRoute><SignupPage theme={theme} /></PublicRoute>} />
                        <Route path="/" element={<PrivateRoute><DashboardPage theme={theme} /></PrivateRoute>} />
                        <Route path="/income" element={<PrivateRoute><IncomePage theme={theme} /></PrivateRoute>} />
                        <Route path="/expenses" element={<PrivateRoute><ExpensesPage theme={theme} /></PrivateRoute>} />
                        <Route path="/settings" element={<PrivateRoute><SettingsPage theme={theme} /></PrivateRoute>} />
                        <Route path="/export" element={<PrivateRoute><ExportPage theme={theme} /></PrivateRoute>} />
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


/* import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
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
                    <aside className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] ${theme.glass} border-r ${theme.cardBorder} transition-all duration-300 z-30 ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}`}>
                        <nav className="p-4 pt-8 space-y-2">
                            {[
                                { icon: <BarChart3 size={20} />, label: 'Dashboard', path: '/' },
                                { icon: <TrendingUp size={20} />, label: 'Income', path: '/income' },
                                { icon: <TrendingDown size={20} />, label: 'Expenses', path: '/expenses' },
                                { icon: <PieChart size={20} />, label: 'Analytics', path: '/analytics' },
                                { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
                            ].map((item) => (
                                <Link to={item.path} key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${window.location.pathname === item.path ? `bg-teal-500 text-white` : `${theme.cardBg} hover:opacity-80`}`}>
                                    {item.icon}
                                    <span className={sidebarOpen ? 'block' : 'lg:hidden'}>{item.label}</span>
                                </Link>
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
 */






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