import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext'; // Adjust the import path

interface Certificate {
  _id: string;
  certifiedType: string;
  certifiedName: string;
  certifiedCourse: string;
  startDate: string;
  endDate: string;
  issuedDate: string;
}

const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { token } = authContext; // Get token from AuthContext

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/certificates', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the header
          },
        });
        setCertificates(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError('Failed to load certificates.');
        setLoading(false);
      }
    };

    if (token) {
      fetchCertificates(); // Only fetch if the token exists
    }
  }, [token]);

  if (loading) return <p>Loading certificates...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Certificates</h1>
      <ul>
        {certificates.map((certificate) => (
          <li key={certificate._id}>
            <h2>{certificate.certifiedName}</h2>
            <p>Type: {certificate.certifiedType}</p>
            <p>Course: {certificate.certifiedCourse}</p>
            <p>Start Date: {certificate.startDate}</p>
            <p>End Date: {certificate.endDate}</p>
            <p>Issued Date: {new Date(certificate.issuedDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certificates;
