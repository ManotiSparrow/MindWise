import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EducationHub from './pages/EducationHub';
import Chatbot from './pages/Chatbot';
import Articles from './pages/Articles';
import CrisisHelp from './pages/CrisisHelp';
import About from './pages/About';
import Search from './pages/Search';
import { ThemeProvider } from './contexts/ThemeContext';
import { SearchProvider } from './contexts/SearchContext';

function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <Router>
          <div className="min-h-screen bg-background transition-smooth">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/education" element={<EducationHub />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/crisis" element={<CrisisHelp />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;