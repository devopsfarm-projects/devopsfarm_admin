// /src/components/Logout
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext)!;
 const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  navigate('/login'); // Navigate to login after logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
