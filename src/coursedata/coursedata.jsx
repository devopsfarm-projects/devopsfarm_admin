import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Coursedata() {
    const [data, setData] = useState([]);
      const [newItem, setNewItem] = useState("");
      const [imageFile, setImageFile] = useState(null);
      const [imageAlt, setImageAlt] = useState("");
      const [imageName, setImageName] = useState("");
      const [uploading, setUploading] = useState(false);
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
    
      // Fetch data from the backend
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/courses');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError("Failed to fetch data.");
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
    
      // Handle adding new data with image upload
      const addData = async () => {
        if (!newItem || !imageFile || !imageAlt || !imageName) {
          setError("Please fill in all fields and select an image.");
          return;
        }
    
        setUploading(true);
        setError("");
        setSuccess("");
    
        const formData = new FormData();
        formData.append('name', newItem);
        formData.append('image', imageFile); 
        formData.append('imageAlt', imageAlt);
        formData.append('imageName', imageName);
        
    
        try {
          const response = await axios.post('http://localhost:5000/api/courses', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setData([...data, response.data]);
          setNewItem("");
          setImageFile(null);
          setImageAlt("");
          setImageName("");
          setSuccess("Item added successfully!");
        } catch (error) {
          console.error('Error adding data:', error);
          setError("Failed to add item.");
        } finally {
          setUploading(false);
        }
      };
    
      // Handle deleting data by ID
      const deleteData = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/api/courses/${id}`);
          setData(data.filter(item => item._id !== id));
        } catch (error) {
          console.error('Error deleting data:', error);
          setError("Failed to delete item.");
        }
      };
    
      
    
      return (
        <div className=" justify-center items-center relative">
          <h1 className=' absolute'>Course data</h1>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Course Name"
          />
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {imageFile && (
            <div>
              <h3>Image Preview:</h3>
              <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
          <input
            type="text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            placeholder="Enter image alt text"
          />
          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            placeholder="Course Content"
          />
          <button onClick={addData} disabled={uploading}>
            {uploading ? "Uploading..." : "Add Item"}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Image</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item) => (
      <tr key={item._id}>
        <td>{item.name} - {item.imageName}</td>
        <td>
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.imageAlt}
            style={{ width: '50px' }}
          />
        </td>
        <td>
          <button onClick={() => deleteData(item._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      );
    }
    

export default Coursedata;
