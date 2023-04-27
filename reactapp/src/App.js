import React from 'react';
import { BrowserRouter as Router, Route, Link, Outlet, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Projects from './components/Projects';
import Education from './components/Education';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import Post from './components/Post';
import './App.css';
import Footer from './components/Footer'; // import the Footer component
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} index />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:id" element={<Post />} />
      </Routes>
      <Footer />

    </Router>
  );
};

export default App;