import React from 'react';

const CourseCard = ({ course, onDelete, onUpdate }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{course.title}</h3>
        {course.category && <span style={styles.category}>{course.category}</span>}
      </div>

      <div style={styles.content}>
        <p style={styles.description}>{course.description || 'Aucune description'}</p>

        <div style={styles.badgeContainer}>
          <span style={{ ...styles.badge, backgroundColor: '#d1fae5', color: '#065f46' }}>
            {course.status}
          </span>
          <span style={{ ...styles.badge, backgroundColor: '#fef3c7', color: '#92400e' }}>
            {course.difficulty}
          </span>
        </div>

        <div style={styles.details}>
          <div style={styles.detailRow}><strong>Durée:</strong> {course.duration}h</div>
          <div style={styles.detailRow}><strong>Enseignant:</strong> {course.teacher || '—'}</div>
        </div>

        {course.tags?.length > 0 && (
          <div style={styles.tagsContainer}>
            {course.tags.map((tag, i) => (
              <span key={i} style={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <button style={styles.deleteButton} onClick={() => onDelete(course)}>🗑 Supprimer</button>
        <button style={styles.updateButton} onClick={() => onUpdate(course)}>✏️ Modifier</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#fff',
    minWith: '20%',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  title: {
    margin: 0
  },
  category: {
    backgroundColor: '#e0e7ff',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '12px'
  },
  content: {
    marginBottom: '12px'
  },
  description: {
    marginBottom: '12px',
    color: '#4b5563'
  },
  badgeContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px'
  },
  badge: {
    borderRadius: '9999px',
    padding: '4px 8px',
    fontSize: '12px'
  },
  details: {
    fontSize: '14px',
    color: '#374151',
    marginBottom: '12px'
  },
  detailRow: {
    marginBottom: '4px'
  },
  tagsContainer: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  tag: {
    backgroundColor: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px'
  },
  footer: {
    display: 'flex',
    gap: '8px'
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    color: '#b91c1c',
    cursor: 'pointer'
  },
  updateButton: {
    backgroundColor: '#fef3c7',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    color: '#92400e',
    cursor: 'pointer'
  },
  
};

export default CourseCard;
