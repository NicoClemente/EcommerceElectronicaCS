import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;