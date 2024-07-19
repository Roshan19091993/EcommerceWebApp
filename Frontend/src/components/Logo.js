

import React from 'react';
import logo from '../assest/Logo/Funky Factory Logo.jpg';

const Logo = () => {
  return (
    <div className="relative flex items-center justify-center w-16 h-16 bg-black text-yellow-600 hover:bg-purple-600 hover:text-white rounded-full shadow-lg transition duration-300 transform hover:scale-105 overflow-hidden border-4 border-silver">
      <p className="absolute w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <span className="relative z-10 text-center fancy-text">
        Funcky Store
      </span>
    </div>
  );
}

export default Logo;






