// /src/components/AddCourse
import React, { useState } from 'react';
import { createCourse } from '../api/api';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await createCourse(token ?? '', { title, description, duration });
    // refresh course list or redirect
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} placeholder="Duration" />
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourse;
