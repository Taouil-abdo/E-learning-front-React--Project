import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; 
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/api/courses/${id}`)
      .then(response => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseDetail;
