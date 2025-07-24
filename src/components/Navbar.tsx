import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Menu, X, Search, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSearch } from '../contexts/SearchContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('currentUser'));

  React.useEffect(() => {
    const handleStorage = () => setIsLoggedIn(!!localStorage.getItem('currentUser'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchTerm(searchInput);
      navigate('/search');
      setSearchInput('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    // setIsLoggedIn(false); // Remove this line to prevent premature hiding
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Education', path: '/education' },
    { name: 'Chatbot', path: '/chatbot' },
    { name: 'Articles', path: '/articles' },
    { name: 'Crisis Help', path: '/crisis' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {isLoggedIn && (
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-[100] group">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-br from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white px-7 py-3 rounded-full shadow-2xl transition-transform duration-200 border-4 border-white dark:border-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300 animate-bounce-once hover:scale-105 active:scale-95 drop-shadow-xl"
            style={{ boxShadow: '0 8px 32px rgba(80,0,120,0.22)' }}
            onMouseDown={e => e.currentTarget.classList.add('animate-bounce-once')}
            onAnimationEnd={e => e.currentTarget.classList.remove('animate-bounce-once')}
            aria-label="Log out"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 rounded-lg bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
            Log out of your account
          </span>
        </div>
      )}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-foreground">MindWise</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-8 w-full">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-muted-foreground hover:text-primary transition-smooth font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/journal"
                className="text-muted-foreground hover:text-primary transition-smooth font-medium"
              >
                Journal
              </Link>
            </div>

            {/* Search and Theme Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-muted border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-ring text-foreground transition-smooth"
                />
              </form>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-muted hover:bg-accent transition-smooth"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Sun className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary focus:outline-none transition-smooth"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-border"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-smooth font-medium px-2 py-1"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/journal"
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-smooth font-medium px-2 py-1"
                >
                  Journal
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;