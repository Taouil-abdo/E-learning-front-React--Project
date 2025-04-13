import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/V1/stats/courses')
      .then(response => {
        setStats(response.data);
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
    <div>
      <h1>Statistics</h1>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
};

export default Stats;
