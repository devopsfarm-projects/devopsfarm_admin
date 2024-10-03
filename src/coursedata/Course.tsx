import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Course interface
interface Course {
    _id: string;
    name: string;
    image: string;
    imageAlt: string;
    imageName: string;
}

function Course() {
    const [data, setData] = useState<Course[]>([]);
    const [error, setError] = useState<string>("");

    const fetchData = async () => {
        try {
            const response = await axios.get<Course[]>('http://localhost:5000/courses');
            setData(response.data); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Failed to fetch data.");
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Course List</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
            <table className="min-w-full border border-gray-300 dark:border-gray-600">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Name</th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Image</th>
                        <th className="p-2 border border-gray-300 dark:border-gray-600">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map((item) => (
                        <tr key={item._id} className="border-b dark:border-gray-600">
                            <td className="p-2 border border-gray-300 dark:border-gray-600">{item.name} - {item.imageName}</td>
                            <td className="p-2 border border-gray-300 dark:border-gray-600">
                                <img
                                    src={`http://localhost:5000/uploads/${item.image}`} // Update with the correct path to your images
                                    alt={item.imageAlt}
                                    className="w-16 h-16"
                                />
                            </td>
                            <td className="p-2 border border-gray-300 dark:border-gray-600">
                                {/* Add any action buttons here if needed */}
                                <button className="mr-2 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Edit</button>
                                <button className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md">Delete</button>
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

export default Course;
