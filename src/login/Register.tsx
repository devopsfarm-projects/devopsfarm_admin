import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Register = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  
  if (!authContext) {
    throw new Error('AuthContext is not available');
  }

  const { register } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <main>
      <div className="flex bg-slate-900 items-center h-screen px-2 sm:px-0">
        <form onSubmit={handleSubmit} className="bg-gray-100 w-full max-w-sm sm:max-w-xl mx-auto p-4 rounded-xl shadow-md">
          <div className="px-4 m-4 text-center">
            <h2 className="text-xl font-bold">Register a new account</h2>
          </div>

          <div className="inputs p-4 w-full">
            <div className="grid grid-cols-1 max-w-md mx-auto">
              <div className="form-group gap-2">
                <label className="block my-2" htmlFor="name">Name:</label>
                <input
                  className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group gap-2">
                <label className="block my-2" htmlFor="email">Email:</label>
                <input
                  className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block my-2" htmlFor="password">Password:</label>
                <input
                  className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block my-2" htmlFor="role">Role:</label>
                <select
                  className="w-full border-2 rounded-md px-3 py-2 my-1 shadow-sm"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button className="w-full bg-blue-700 text-gray-50 rounded-md shadow-sm px-3 py-2 my-4 hover:bg-blue-600" type="submit">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
