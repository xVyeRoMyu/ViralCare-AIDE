import React from 'react';
import { Link } from 'react-router-dom';
import { FaClinicMedical } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
			<FaClinicMedical className="text-3xl text-blue-600 mr-4" />
			<h1 className="text-2xl font-bold text-healthcare-700">ViralCare AIDE</h1>
		  </div>
          <nav className="hidden md:flex space-x-10">
            <Link to="/login" className="text-gray-700 hover:text-healthcare-600 font-medium">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-healthcare-600 font-medium">Mendaftar</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;