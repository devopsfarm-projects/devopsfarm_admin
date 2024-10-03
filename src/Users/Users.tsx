import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext'; // Adjust the import path

interface User {
  _id: string;
  email: string;
  password: string; // Consider hashing passwords on the server side
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // New state for success message

  // State for editing users
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');

  // State for adding a new user
  const [newUserName, setNewUserName] = useState('');  // Added for name field
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

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

  // Handle Delete User
  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the header
        },
      });
      setUsers(users.filter(user => user._id !== userId)); // Remove the user from the state after deletion
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user.');
    }
  };

  // Handle Edit User
  const handleEdit = (user: User) => {
    setEditUserId(user._id);
    setEditEmail(user.email);
    setEditPassword(''); // Don't show hashed password, ask for new one
  };

  const saveEdit = async () => {
    try {
      const updatedUser = { email: editEmail, password: editPassword };
      await axios.put(`http://localhost:5000/users/${editUserId}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the header
        },
      });
      setUsers(users.map(user => (user._id === editUserId ? { ...user, email: editEmail } : user)));
      setEditUserId(null); // Reset edit mode
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user.');
    }
  };

  // Handle Add User
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccessMessage(null); // Reset success message

    try {
      // Register the new user
      const newUser = { name: newUserName, email: newUserEmail, password: newUserPassword }; // Include name here
      const response = await axios.post('http://localhost:5000/auth/register', newUser, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the header
        },
      });
      setUsers([...users, response.data]); // Add new user to state
      setSuccessMessage('User added successfully!'); // Set success message
      setNewUserName(''); // Clear inputs after successful registration
      setNewUserEmail('');
      setNewUserPassword('');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessOk = () => {
    // Refresh the user list
    setSuccessMessage(null); // Clear success message
    setLoading(true); // Set loading state

    // Fetch users again
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data); // Update users state
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchUsers(); // Call the fetch function
  };

  if (loading) return <p className="text-center">Loading users...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Users</h1>

      {/* Form to Add New User */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-700">
        <h2 className="text-xl font-semibold mb-2">Add New User</h2>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Name"
          required
          className="mb-2 p-2 border rounded-md w-full"
        />
        <input
          type="email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="Email"
          required
          className="mb-2 p-2 border rounded-md w-full"
        />
        <input
          type="password"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
          placeholder="Password"
          required
          className="mb-2 p-2 border rounded-md w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md w-full hover:bg-blue-500">
          Add User
        </button>
      </form>

      {successMessage && (
        <div className="mb-4 p-4 border rounded-lg shadow-md bg-green-100 text-green-800">
          <p>{successMessage}</p>
          <button onClick={handleSuccessOk} className="mt-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500">
            OK
          </button>
        </div>
      )}

      <ul className="w-full max-w-lg">
        {users.map((user) => (
          <li key={user._id} className="mb-4 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-700">
            {editUserId === user._id ? (
              // Edit mode for the user
              <div>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="New Email"
                  required
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="New Password"
                  required
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <button onClick={saveEdit} className="bg-green-600 text-white p-2 rounded-md w-full hover:bg-green-500">
                  Save
                </button>
                <button onClick={() => setEditUserId(null)} className="bg-gray-400 text-white p-2 rounded-md w-full hover:bg-gray-300 mt-2">
                  Cancel
                </button>
              </div>
            ) : (
              // Display user info
              <div>
                <p className="text-gray-800 dark:text-white">Email: {user.email}</p>
                <p className="text-gray-800 dark:text-white">Password (Hashed): {user.password}</p>
                <div className="flex justify-between">
                  <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-400">
                    Edit
                  </button>
                  <button onClick={() => deleteUser(user._id)} className="bg-red-600 text-white p-2 rounded-md hover:bg-red-500">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
