// /src/components/CourseList.tsx
import { useState, useEffect } from 'react';
import { getCourses } from '../api/api';
import { Course } from '../types';

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]); // Set the type explicitly to an array of Course

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      const data: Course[] = await getCourses(token ?? ''); // Explicitly type the response
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.title} - {course.description} - {course.duration} hours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
