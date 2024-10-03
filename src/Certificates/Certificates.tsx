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
  
  // State for editing certificates
  const [editCertificateId, setEditCertificateId] = useState<string | null>(null);
  const [editCertifiedType, setEditCertifiedType] = useState('');
  const [editCertifiedName, setEditCertifiedName] = useState('');
  const [editCertifiedCourse, setEditCertifiedCourse] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editIssuedDate, setEditIssuedDate] = useState('');

  // State for adding new certificate
  const [newCertifiedType, setNewCertifiedType] = useState('');
  const [newCertifiedName, setNewCertifiedName] = useState('');
  const [newCertifiedCourse, setNewCertifiedCourse] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newIssuedDate, setNewIssuedDate] = useState('');

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

  // Handle Add Certificate
  const addCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCertificate = {
        certifiedType: newCertifiedType,
        certifiedName: newCertifiedName,
        certifiedCourse: newCertifiedCourse,
        startDate: newStartDate,
        endDate: newEndDate,
        issuedDate: newIssuedDate,
      };

      const response = await axios.post('http://localhost:5000/certificates', newCertificate, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the header
        },
      });
      setCertificates([...certificates, response.data]);
      // Clear input fields
      setNewCertifiedType('');
      setNewCertifiedName('');
      setNewCertifiedCourse('');
      setNewStartDate('');
      setNewEndDate('');
      setNewIssuedDate('');
    } catch (err) {
      console.error('Error adding certificate:', err);
      setError('Failed to add certificate.');
    }
  };

  // Handle Delete Certificate
  const deleteCertificate = async (certificateId: string) => {
    try {
      await axios.delete(`http://localhost:5000/certificates/${certificateId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the header
        },
      });
      setCertificates(certificates.filter(cert => cert._id !== certificateId));
    } catch (err) {
      console.error('Error deleting certificate:', err);
      setError('Failed to delete certificate.');
    }
  };

  // Handle Edit Certificate
  const handleEdit = (certificate: Certificate) => {
    setEditCertificateId(certificate._id);
    setEditCertifiedType(certificate.certifiedType);
    setEditCertifiedName(certificate.certifiedName);
    setEditCertifiedCourse(certificate.certifiedCourse);
    setEditStartDate(certificate.startDate);
    setEditEndDate(certificate.endDate);
    setEditIssuedDate(certificate.issuedDate);
  };

  const saveEdit = async () => {
    if (editCertificateId) {
      try {
        const updatedCertificate = {
          certifiedType: editCertifiedType,
          certifiedName: editCertifiedName,
          certifiedCourse: editCertifiedCourse,
          startDate: editStartDate,
          endDate: editEndDate,
          issuedDate: editIssuedDate,
        };

        const response = await axios.put(`http://localhost:5000/certificates/${editCertificateId}`, updatedCertificate, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the header
          },
        });

        setCertificates(certificates.map(cert => (cert._id === editCertificateId ? response.data : cert)));
        setEditCertificateId(null); // Reset edit mode
      } catch (err) {
        console.error('Error updating certificate:', err);
        setError('Failed to update certificate.');
      }
    }
  };

  if (loading) return <p className="text-center">Loading certificates...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Certificates</h1>
      
      {/* Form to Add New Certificate */}
      <form onSubmit={addCertificate} className="mb-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Add New Certificate</h2>
        <input
          type="text"
          value={newCertifiedType}
          onChange={(e) => setNewCertifiedType(e.target.value)}
          placeholder="Certificates Type"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          value={newCertifiedName}
          onChange={(e) => setNewCertifiedName(e.target.value)}
          placeholder="Certificates Name"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          value={newCertifiedCourse}
          onChange={(e) => setNewCertifiedCourse(e.target.value)}
          placeholder="Course Name"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          value={newStartDate}
          onChange={(e) => setNewStartDate(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          value={newEndDate}
          onChange={(e) => setNewEndDate(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          value={newIssuedDate}
          onChange={(e) => setNewIssuedDate(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Certificate</button>
      </form>

      <ul className="w-full max-w-xl">
        {certificates.map((certificate) => (
          <li key={certificate._id} className="mb-4 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-700">
            {editCertificateId === certificate._id ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Editing {certificate.certifiedName}</h2>
                <input
                  type="text"
                  value={editCertifiedType}
                  onChange={(e) => setEditCertifiedType(e.target.value)}
                  placeholder="Type"
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  value={editCertifiedName}
                  onChange={(e) => setEditCertifiedName(e.target.value)}
                  placeholder="Name"
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  value={editCertifiedCourse}
                  onChange={(e) => setEditCertifiedCourse(e.target.value)}
                  placeholder="Course"
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="date"
                  value={editStartDate}
                  onChange={(e) => setEditStartDate(e.target.value)}
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="date"
                  value={editEndDate}
                  onChange={(e) => setEditEndDate(e.target.value)}
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="date"
                  value={editIssuedDate}
                  onChange={(e) => setEditIssuedDate(e.target.value)}
                  className="w-full mb-2 p-2 border border-gray-300 rounded"
                  required
                />
                <button onClick={saveEdit} className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">Save Changes</button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{certificate.certifiedName}</h2>
                <p className="text-gray-600 dark:text-gray-300">Type: {certificate.certifiedType}</p>
                <p className="text-gray-600 dark:text-gray-300">Course: {certificate.certifiedCourse}</p>
                <p className="text-gray-600 dark:text-gray-300">Start Date: {certificate.startDate}</p>
                <p className="text-gray-600 dark:text-gray-300">End Date: {certificate.endDate}</p>
                <p className="text-gray-600 dark:text-gray-300">Issued Date: {new Date(certificate.issuedDate).toLocaleDateString()}</p>
                <button onClick={() => handleEdit(certificate)} className="mr-2 p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => deleteCertificate(certificate._id)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certificates;





// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/authContext'; // Adjust the import path

// interface Certificate {
//   _id: string;
//   certifiedType: string;
//   certifiedName: string;
//   certifiedCourse: string;
//   startDate: string;
//   endDate: string;
//   issuedDate: string;
// }

// const Certificates = () => {
//   const [certificates, setCertificates] = useState<Certificate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const authContext = useContext(AuthContext);

//   if (!authContext) {
//     throw new Error('AuthContext must be used within an AuthProvider');
//   }

//   const { token } = authContext; // Get token from AuthContext

//   useEffect(() => {
//     const fetchCertificates = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/certificates', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass token in the header
//           },
//         });
//         setCertificates(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching certificates:', err);
//         setError('Failed to load certificates.');
//         setLoading(false);
//       }
//     };

//     if (token) {
//       fetchCertificates(); // Only fetch if the token exists
//     }
//   }, [token]);

//   if (loading) return <p className="text-center">Loading certificates...</p>;
//   if (error) return <p className="text-center text-red-600">{error}</p>;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
//       <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Certificates</h1>
//       <ul className="w-full max-w-xl">
//         {certificates.map((certificate) => (
//           <li key={certificate._id} className="mb-4 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-700">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{certificate.certifiedName}</h2>
//             <p className="text-gray-600 dark:text-gray-300">Type: {certificate.certifiedType}</p>
//             <p className="text-gray-600 dark:text-gray-300">Course: {certificate.certifiedCourse}</p>
//             <p className="text-gray-600 dark:text-gray-300">Start Date: {certificate.startDate}</p>
//             <p className="text-gray-600 dark:text-gray-300">End Date: {certificate.endDate}</p>
//             <p className="text-gray-600 dark:text-gray-300">Issued Date: {new Date(certificate.issuedDate).toLocaleDateString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Certificates;
