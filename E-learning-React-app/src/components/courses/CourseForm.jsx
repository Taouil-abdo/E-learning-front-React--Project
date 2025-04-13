import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const CourseForm = ({ onCourseAdded, closeForm }) => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    duration: '',
    difficulty: '',
    status: 'pending',
    category: '',
    teacher: '',
    tags: [],
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          api.get('/api/categories'),
          api.get('/api/tags'),
        ]);
        setCategories(catRes.data.data || []);
        setTags(tagRes.data.data || []);
      } catch (err) {
        console.error('Erreur lors du chargement des catégories ou des tags', err);
        setError("Erreur lors du chargement des catégories ou des tags");
      }
    };
    fetchCategoriesAndTags();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: type === 'select-multiple'
        ? Array.from(selectedOptions, (option) => option.value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/courses', course);
      if (onCourseAdded) {
        onCourseAdded(response.data.data);
      }
      closeForm();
    } catch (err) {
      console.error('Erreur lors de la création du cours', err);
      setError("Erreur lors de la création du cours");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        <h2 className="text-2xl font-semibold mb-4">Ajouter un nouveau cours</h2>
        
        {error && <p className="text-red-600 mb-3">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Titre" name="title" value={course.title} onChange={handleChange} required />
          <Textarea label="Description" name="description" value={course.description} onChange={handleChange} />
          <Input label="Durée (en heures)" name="duration" type="number" value={course.duration} onChange={handleChange} required />
          
          <Select
            label="Difficulté"
            name="difficulty"
            value={course.difficulty}
            onChange={handleChange}
            options={[
              { value: 'Beginner', label: 'Débutant' },
              { value: 'Intermediate', label: 'Intermédiaire' },
              { value: 'Advanced', label: 'Avancé' },
            ]}
            required
          />

          <Select
            label="Catégorie"
            name="category"
            value={course.category}
            onChange={handleChange}
            options={Array.isArray(categories) ? categories.map((cat) => ({
              value: cat.id,
              label: cat.name
            })) : []}
            required
          />

          <Select
            label="Tags"
            name="tags"
            value={course.tags}
            onChange={handleChange}
            options={Array.isArray(tags) ? tags.map((tag) => ({
              value: tag.id,
              label: tag.name
            })) : []}
            multiple
          />

          <Input label="Nom du professeur" name="teacher" value={course.teacher} onChange={handleChange} required />

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={closeForm} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Annuler</button>
            <button type="submit" disabled={loading}
              className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400">
              {loading ? 'Ajout en cours...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, name, type = 'text', value, onChange, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options, required, multiple = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      multiple={multiple}
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    >
      {!multiple && <option value="">-- Sélectionner --</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default CourseForm;


