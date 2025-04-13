import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ courses, onDelete, onUpdate }) => {
  return (
<div className="course-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
{courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default CourseList;
