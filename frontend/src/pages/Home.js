import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get('/api/v1/sports')
      .then(res => setSports(res.data.sports))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Sports List</h1>
      {!user && <p className="mb-4 text-red-500">Please <Link to="/login" className="underline">login</Link> to book slots.</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sports.map(sport => (
          <li key={sport} className="bg-white p-4 rounded shadow">
            {sport}
            <Link to={`/slots/${sport}`} className="ml-4 text-blue-500">View Slots</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;