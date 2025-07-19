import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <Link to="/dashboard" className="text-xl font-bold hover:text-gray-200">
        🌍 LangLearn
      </Link>

      <div className="flex gap-4">
        <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
        <button onClick={handleLogout} className="hover:text-gray-200">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
