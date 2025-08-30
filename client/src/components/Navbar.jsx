"use client";

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          Mindnest
        </Link>
      </div>

      <div className="flex space-x-8">
        <Link href="/" className="hover:text-blue-400">Home</Link>
        <Link href="/games" className="hover:text-blue-400">Games</Link>
        <Link href="/chat" className="hover:text-blue-400">Chat</Link>
        <Link href="/mood" className="hover:text-blue-400">Mood Tracker</Link>
      </div>

      <div className="flex space-x-4">
        <Link href="/login" className="hover:text-blue-400">Login</Link>
        <Link href="/signup" className="hover:text-blue-400">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
