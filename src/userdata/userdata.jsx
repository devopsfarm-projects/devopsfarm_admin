import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Userdata() {
  const [users, setUsers] = useState([]); // State for users data
  const [newUser, setNewUser] = useState({ name: "", email: "", mobile: "", username: "" }); // State for new user input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users.');
      setLoading(false); // Stop loading even if there's an error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle adding new user
  const addUser = async () => {
    const { name, email, mobile, username } = newUser;
    if (!name || !email || !mobile || !username) return; // Prevent adding empty users
    try {
      const response = await axios.post('http://localhost:5000/api/users', newUser); // POST request to backend
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "", mobile: "", username: "" }); // Clear input fields
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user.');
    }
  };

  // Handle deleting user by ID
  const deleteUser = async (id) => {
    const updatedUsers = users.filter(user => user._id !== id);
    setUsers(updatedUsers); // Optimistically remove the user from the UI
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user.');
      setUsers(users); // Revert UI update in case of error
    }
  };

  // Handle input changes for new user fields
  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  // Render form and users list
  return (
    <div className=" justify-center items-center text-center">
      <h1>Manage Users</h1>

      {/* Display error if it exists */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* User input form */}
      <div>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Enter email"
        />
        <input
          type="text"
          name="mobile"
          value={newUser.mobile}
          onChange={handleInputChange}
          placeholder="Enter mobile"
        />
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          placeholder="Enter username"
        />
        <button onClick={addUser}>Add User</button>
      </div>

      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.username}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}
    </div>
  );
}

export default Userdata;
