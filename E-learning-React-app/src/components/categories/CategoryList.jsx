import React, { useEffect, useState } from 'react';
import '../../CategoryList.css';
import CategoryCard from './CategoryCard';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import api from '../../services/api'; 

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/categories')
      .then(response => {
        console.log(response.data);
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="category-table-container">
      <h2>Liste des Catégories</h2>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description || '—'}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Aucune catégorie trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
