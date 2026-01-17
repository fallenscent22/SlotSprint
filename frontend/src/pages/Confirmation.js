import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
  const { state } = useLocation();
  const message = state?.message || 'No message';

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl mb-4">{message}</h2>
        <Link to="/" className="text-blue-500">Back to Home</Link>
      </div>
    </div>
  );
};

export default Confirmation;