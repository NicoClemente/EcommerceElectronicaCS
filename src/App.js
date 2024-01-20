 
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Router>
      <Navigation  />
      <Footer />
    </Router>
  );
}

export default App;
