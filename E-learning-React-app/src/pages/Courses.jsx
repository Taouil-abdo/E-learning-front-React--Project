import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseForm from '../components/courses/CourseForm';
import CourseList from '../components/courses/CourseList';

const API_URL = 'http://localhost:8000/api/courses'; // Update this to match your Laravel route

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_URL);
      setCourses(response.data.data.courses);
    } catch (error) {
      console.error('Erreur lors du chargement des cours:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async (newCourse) => {
    try {
      const response = await axios.post(API_URL, newCourse);
      setCourses([...courses, response.data.data.courses]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const updateCourse = async (id, updatedFields) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedFields);
      setCourses(courses.map(course => course.id === id ? response.data : course));
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📘 Gestion des cours</h2>
      <CourseForm onSubmit={addCourse} />
      <CourseList
        courses={courses}
        onDelete={(course) => deleteCourse(course.id)}
        onUpdate={(course) => {
          const newTitle = prompt("Nouveau titre :", course.title);
          if (newTitle) {
            updateCourse(course.id, { ...course, title: newTitle });
          }
        }}
      />
    </div>
  );
};

export default CoursesPage;
