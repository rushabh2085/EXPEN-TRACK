import React from "react";
import Header from './components/Header';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import { AuthProvider } from "./context/authContext";


const Navigation = () => (
  <nav>
    <Link to ="/login">Login</Link>
    <Link to ="/signup">Signup</Link>
  </nav>
);

function App() {
   
  return(
    <AuthProvider>  
    <Router>
      <Header/>

      <main>
        <Routes>
        <Route path = "/login" element={<LoginPage/>} />
        <Route path = "/signup" element={<SignupPage/>} />
        <Route path = "/" element={<SignupPage/>} />
        </Routes>
      </main>
    </Router>
    </AuthProvider>
  );
}
export default App;