import React, { useState } from 'react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen flex">
      <nav className={`w-40 bg-navy bg-opacity-50 backdrop-blur-lg p-4 fixed top-0 left-0 h-full flex flex-col justify-between transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}>
        <ul className="flex flex-col space-y-4">
          <li>
            <a href="/" className="text-white text-lg hover:text-gray-300">Search</a>
          </li>
          <li>
            <a href="/map" className="text-white text-lg hover:text-gray-300">Map</a>
          </li>
          <li>
            <a href="#" className="text-white text-lg hover:text-gray-300">History</a>
          </li>
          <li>
            <a href="#" className="text-white text-lg hover:text-gray-300">Settings</a>
          </li>
        </ul>
      </nav>
      <button
        onClick={toggleNav}
        className="p-2 bg-navy text-white rounded hover:bg-gray-700 fixed bottom-4 left-4 z-50"
      >
        {isOpen ? 'H' : 'S'}
      </button>
      <div className={`ml-40 flex-grow p-8 ${isOpen ? '' : 'ml-0'}`}>
      </div>
    </div>
  );
}

