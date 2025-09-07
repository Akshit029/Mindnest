'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="text-2xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent hover:from-gray-100 hover:via-white hover:to-gray-100 transition-all duration-300"
            >
              Mindnest
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a 
                href="/" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Home
              </a>
              <a 
                href="/games" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Games
              </a>
              <a 
                href="/chat" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Chat
              </a>
              <a 
                href="/mood" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Mood Tracker
              </a>
            </div>
          </div>

          {/* Desktop Auth/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <a 
                  href="/login" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Login
                </a>
                <a 
                  href="/signup" 
                  className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-emerald-600 flex items-center justify-center text-white font-bold">
                  {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 p-2 rounded-lg transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-lg rounded-lg mt-2 border border-gray-800/50">
              <a 
                href="/" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
              >
                Home
              </a>
              <a 
                href="/games" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
              >
                Games
              </a>
              <a 
                href="/chat" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
              >
                Chat
              </a>
              <a 
                href="/mood" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
              >
                Mood Tracker
              </a>
              <div className="border-t border-gray-700/50 pt-3 mt-3">
                {!user ? (
                  <>
                    <a 
                      href="/login" 
                      className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                    >
                      Login
                    </a>
                    <a 
                      href="/signup" 
                      className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 mt-2"
                    >
                      Sign Up
                    </a>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-emerald-600 flex items-center justify-center text-white font-bold">
                        {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="text-gray-300">{user.name || user.email}</span>
                    </div>
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;