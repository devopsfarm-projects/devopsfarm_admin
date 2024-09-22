import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.tsx';

const LoginForm: React.FC = () => {
  const authContext = useContext(AuthContext);

  // State for form input values and mode (login or register)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // To toggle between login and register mode

  // Handle form submission for login or register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authContext) {
      try {
        if (isRegistering) {
          await authContext.register(email, password);
          alert('Registration successful! Please log in.');
          setIsRegistering(false); // Switch back to login mode after successful registration
        } else {
          await authContext.login(email, password);
          alert('Login successful');
        }
      } catch (error) {
        alert(isRegistering ? 'Registration failed' : 'Login failed');
      }
    }
  };

  // Toggle between login and register modes
  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition duration-300"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        <button
          onClick={toggleMode}
          className="mt-6 w-full text-sm text-blue-400 hover:underline"
        >
          {isRegistering ? 'Already have an account? Log in' : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
