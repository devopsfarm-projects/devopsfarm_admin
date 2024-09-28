import React, { useEffect, useState } from 'react';
import { getUsers, updateUser } from '../services/api';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = async (id: string) => {
    try {
      const updatedUser = { name: 'Updated Name' };
      await updateUser(id, updatedUser);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => handleUpdate(user._id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
