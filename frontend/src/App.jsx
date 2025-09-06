import React, { useContext } from "react";
import {  BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from "./context/authContext";

import Header from './components/Header';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";

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
        </Routes>
      </main>
      </AuthProvider>
    </Router>
    
  );
}
export default App;