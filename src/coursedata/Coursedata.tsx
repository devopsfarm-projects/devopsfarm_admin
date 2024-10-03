import { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
    _id: string;
    title: string; 
    description: string; 
    duration: string; 
    image: string; 
}

function Coursedata() {
    const [data, setData] = useState<Course[]>([]);
    const [newItem, setNewItem] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageAlt, setImageAlt] = useState<string>("");
    const [imageName, setImageName] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [editItemId, setEditItemId] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get<Course[]>('http://localhost:5000/courses');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Failed to fetch data.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addData = async () => {
        if (!newItem || !imageFile || !imageAlt || !imageName) {
            setError("Please fill in all fields and select an image.");
            return;
        }
    
        setUploading(true);
        setError("");
        setSuccess("");

        const formData = new FormData();
        formData.append('title', newItem);
        formData.append('description', imageName);
        formData.append('duration', imageAlt);
        formData.append('image', imageFile);
    
        try {
            await axios.post<Course>('http://localhost:5000/courses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            await fetchData();
            resetForm();
            setSuccess("Item added successfully!");
        } catch (error: any) {
            console.error('Error adding data:', error);
            setError(error.response?.data?.message || "Failed to add item.");
        } finally {
            setUploading(false);
        }
    };

    const editData = async (id: string) => {
        if (!newItem || !imageAlt || !imageName) {
            setError("Please fill in all fields.");
            return;
        }

        setUploading(true);
        setError("");
        setSuccess("");

        const formData = new FormData();
        formData.append('title', newItem); // Updated to use 'title'
        if (imageFile) formData.append('image', imageFile);
        formData.append('description', imageName); // Updated to use 'description'
        formData.append('duration', imageAlt); // Updated to use 'duration'

        try {
            const response = await axios.put<Course>(`http://localhost:5000/courses/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setData(prevData => prevData.map(item => item._id === id ? response.data : item));
            resetForm();
            setSuccess("Item edited successfully!");
        } catch (error) {
            console.error('Error editing data:', error);
            setError("Failed to edit item.");
        } finally {
            setUploading(false);
        }
    };

    const deleteData = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/courses/${id}`);
            setData(prevData => prevData.filter(item => item._id !== id));
            setSuccess("Item deleted successfully!");
        } catch (error) {
            console.error('Error deleting data:', error);
            setError("Failed to delete item.");
        }
    };

    const resetForm = () => {
        setNewItem("");
        setImageFile(null);
        setImageAlt("");
        setImageName("");
        setEditItemId(null);
    };

    const handleEdit = (item: Course) => {
        setNewItem(item.title); // Use title instead of name
        setImageAlt(item.duration); // Use duration for imageAlt
        setImageName(item.description); // Use description for imageName
        setEditItemId(item._id);
        setImageFile(null); // Clear file on edit
    };

    return (
        <div className="flex flex-col items-center justify-center p-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-black min-h-screen">
            <h1 className='text-2xl font-bold mb-4'>Course Data</h1>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Course Title" // Changed placeholder to Title
                className="mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full max-w-md"
            />
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setImageFile(file);
                    }
                }}
                className="mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
            {imageFile && (
                <div className="mb-2">
                    <h3>Image Preview:</h3>
                    <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-24 h-24" />
                </div>
            )}
            <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Enter Course Duration" // Changed placeholder to Duration
                className="mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full max-w-md"
            />
            <input
                type="text"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                placeholder="Course Description" // Changed placeholder to Description
                className="mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full max-w-md"
            />
            <button onClick={editItemId ? () => editData(editItemId) : addData} disabled={uploading}
                className={`mb-2 p-2 text-white rounded-md w-full max-w-md ${uploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}>
                {uploading ? "Uploading..." : editItemId ? "Edit Item" : "Add Item"}
            </button>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}
            <table className="min-w-full border border-gray-300 dark:border-gray-600">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Title</th> {/* Changed Name to Title */}
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Image</th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map((item) => (
                        <tr key={item._id} className="border-b dark:border-gray-600">
                            <td className="p-2 border border-gray-300 dark:border-gray-600">{item.title} - {item.description}</td>
                            <td className="p-2 border border-gray-300 dark:border-gray-600">
                                <img
                                    src={`http://localhost:5000/uploads/${item.image}`}
                                    alt={item.title} 
                                    className="w-16 h-16"
                                />
                            </td>
                            <td className="p-2 border border-gray-300 dark:border-gray-600">
                                <button 
                                    onClick={() => handleEdit(item)} // Trigger edit on click
                                    className="mr-2 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Edit
                                </button>
                                <button 
                                    onClick={() => deleteData(item._id)} // Trigger delete on click
                                    className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md">Delete
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={3} className="text-center">No courses available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Coursedata;
