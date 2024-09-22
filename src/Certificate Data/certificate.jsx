import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../2025.png';

const Certificate = () => {
  const [formData, setFormData] = useState({
    certifiedType: '',
    certifiedName: '',
    certifiedCourse: '',
    startDate: '',
    endDate: '',
  });

  // Fetch data from the API on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/certificate'); // Adjust the URL as needed
        setFormData(response.data); // Assuming the response returns the same structure as formData
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on component mount

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/certificate', formData);
      alert(response.data.message || 'Success'); // Assuming the API sends a message on success
    } catch (error) {
      console.error('Error sending data', error);
    }
  };

  return (
    <>
      <div className="w-full h-auto bg-white dark:bg-clip-bg dark:bg-transparent dark:bg-logo-gradient font-bold flex flex-col items-center justify-center">
        <div className="border-2 border-gray-300 rounded-lg max-w-3xl shadow-xl bg-gradient-to-r from-blue-50 to-purple-100 flex">
          <div className="relative w-1/3">
            <img src={image} alt="Logo" className="w-auto full object-cover rounded-md" />
          </div>
          <div className="w-2/3">
            <form onSubmit={handleSubmit}>
              <div className="py-20 px-8">
                <h1 className="text-6xl font-extrabold text-blue-700 text-center uppercase" style={{ fontFamily: 'serif' }}>
                  Certificate
                </h1>
                <h2 className="text-3xl text-gray-700 font-bold text-black-700 text-center uppercase" style={{ fontFamily: 'serif' }}>
                  Of{' '}
                  <input
                    type="text"
                    name="certifiedType"
                    value={formData.certifiedType}
                    onChange={handleInputChange}
                    placeholder="Certified Type"
                    className="w-full text-center"
                  />
                </h2>
                <p className="mt-4 font-semibold text-center text-gray-600 uppercase">This Certificate is Presented to</p>
                <h3 className="text-3xl font-bold text-blue-700 mt-2 border-b-4 border-blue-600 text-center">
                  <input
                    type="text"
                    name="certifiedName"
                    value={formData.certifiedName}
                    onChange={handleInputChange}
                    placeholder="Certified Name"
                    className="w-full text-center"
                  />
                </h3>
                <p className="mt-4 text-md font-semibold text-center text-gray-600">
                  <p className="mt-4 text-lg font-semibold text-center text-gray-600 uppercase">For the successful completion of</p>
                  <br />
                  <p className="text-xl font-bold text-center text-gray-600">
                    <input
                      type="text"
                      name="certifiedCourse"
                      value={formData.certifiedCourse}
                      onChange={handleInputChange}
                      placeholder="Get in Certified"
                      className="w-full text-center"
                    />
                  </p>
                  <br />
                  <strong>
                    <input
                      type="text"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      placeholder="Start Date"
                      className="text-center"
                    />
                  </strong>{' '}
                  to{' '}
                  <strong>
                    <input
                      type="text"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      placeholder="End Date"
                      className="text-center"
                    />
                  </strong>{' '}
                  and has performed well as a Student.
                </p>
                <button type="submit" className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;
