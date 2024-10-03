import React, { useContext } from 'react';
// import logo from '../devopsfarm-logo-1500x1500 (1).png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; // Adjust the path as necessary

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    if (authContext) {
      authContext.logout();
    }
  };

  return (
    <nav className="bg-black text-white">
      <div className="w-full py-3 border-b border-gray-700">
        <div className="flex justify-between px-20 items-center font-semibold">
          {/* <div>
           <Link to='/'><img className="w-16" src={logo} alt="logo" /></Link>
            
          </div> */}
          {authContext?.isAuthenticated ? (
        
          <div className="flex xl:gap-10 md:gap-8 gap-2">
  <Link 
    className="relative group text-gray-300 hover:text-gray-100 transition" 
    to="/users"
  >
    User Data
    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
  </Link>
  <Link 
    className="relative group text-gray-300 hover:text-gray-100 transition" 
    to="/certigicates"
  >
    Certificate Data
    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
  </Link>
  <Link 
    className="relative group text-gray-300 hover:text-gray-100 transition" 
    to="/courses"
  >
    Course Data
    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
  </Link>
  <Link 
    className="relative group text-gray-300 hover:text-gray-100 transition" 
    to="/add-course"
  >
   Add Course
    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
  </Link>
</div>
          ) : (

            <h1 className="   font-semibold transition">
              Admin
            </h1>
         
          )}
          <div>
            {/* Login/Logout Button */}
            {authContext?.isAuthenticated ? (
              <button 
                onClick={handleLogout} 
                className="py-2 px-6 bg-red-600 hover:bg-red-500 rounded-3xl font-semibold transition"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="py-2 px-6 bg-blue-600 hover:bg-blue-500 rounded-3xl font-semibold transition">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
