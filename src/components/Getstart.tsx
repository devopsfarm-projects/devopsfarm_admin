import React from 'react';
import { Link } from 'react-router-dom';

const Getstart: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900"> {/* Center the button and set a dark background */}
      <Link 
        to="/Login" 
        className="inline-flex items-center rounded cursor-pointer bg-[#273ef1] px-6 py-3 font-semibold text-white transition [box-shadow:rgb(171,_196,245)-8px_8px] hover:[box-shadow:rgb(171,_196,_245)0px_0px]"
      >
        Get started →
      </Link>
    </div>
  );
};

export default Getstart;
