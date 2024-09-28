import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext'; // Adjust the import path
import Logout from './LogoutButton';
const LoginForm = () => {
  // Use the AuthContext and check if it exists
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login, isAuthenticated } = authContext; // Destructure after the check
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);  // Call login function from context
      // Navigate or update UI after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return isAuthenticated ? (
    <p>You are logged in! <Logout/></p>
  ) : (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;














// // /src/components/Login
// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/authContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const { login } = useContext(AuthContext)!;
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//  const navigate = useNavigate(); // Now use useNavigate here

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(username, password);
//     navigate('/courses'); 
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="text" 
//         value={username} 
//         onChange={(e) => setUsername(e.target.value)} 
//         placeholder="Username" 
//       />
//       <input 
//         type="password" 
//         value={password} 
//         onChange={(e) => setPassword(e.target.value)} 
//         placeholder="Password" 
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;






// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const LoginForm: React.FC = () => {
//   const authContext = useContext(AuthContext);

//   // State for form input values and mode (login or register)
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false); // To toggle between login and register mode

//   // Handle form submission for login or register
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (authContext) {
//       try {
//         if (isRegistering) {
//           await authContext.register(email, password);
//           alert('Registration successful! Please log in.');
//           setIsRegistering(false); // Switch back to login mode after successful registration
//         } else {
//           await authContext.login(email, password);
//           alert('Login successful');
//         }
//       } catch (error) {
//         alert(isRegistering ? 'Registration failed' : 'Login failed');
//       }
//     }
//   };

//   // Toggle between login and register modes
//   const toggleMode = () => {
//     setIsRegistering((prev) => !prev);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-white text-center mb-6">
//           {isRegistering ? 'Register' : 'Login'}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-gray-400 mb-2">Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-400 mb-2">Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition duration-300"
//           >
//             {isRegistering ? 'Register' : 'Login'}
//           </button>
//         </form>
//         <button
//           onClick={toggleMode}
//           className="mt-6 w-full text-sm text-blue-400 hover:underline"
//         >
//           {isRegistering ? 'Already have an account? Log in' : "Don't have an account? Register"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
