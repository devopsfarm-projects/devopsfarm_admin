import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext'; // Adjust the import path

interface User {
  _id: string;
  email: string;
  password: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { token } = authContext; // Get token from AuthContext

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the header
          },
        });
        setUsers(response.data); // Assuming the response contains an array of users
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers(); // Only fetch if the token exists
    }
  }, [token]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>Email: {user.email}</p>
            <p>Password (Hashed): {user.password}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
