import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Slots = () => {
  const { sport } = useParams();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchSlots = () => {
    setLoading(true);
    setError('');
    axios.get(`/api/v1/slots?sport=${sport}&date=${date}`)
      .then(res => setSlots(res.data.slots))
      .catch(err => setError(err.response?.data?.message || 'Failed to fetch slots'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchSlots, [sport, date]);

  const bookSlot = (slotId) => {
    if (!user) return navigate('/login');
    axios.post('/api/v1/bookings', { slotId }, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(() => navigate('/confirmation', { state: { message: 'Booking successful!' } }))
      .catch(err => {
        if (err.response?.status === 401) navigate('/login');
        else setError(err.response?.data?.message || 'Booking failed');
      });
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Slots for {sport}</h1>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={minDate} className="border p-2 mb-4" />
      <button onClick={fetchSlots} className="bg-blue-500 text-white p-2 ml-2">Refresh</button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {slots.map(slot => (
          <li key={slot._id} className={`p-4 rounded shadow ${slot.status === 'available' ? 'bg-green-100' : 'bg-gray-100'}`}>
            {slot.startTime} - {slot.endTime}
            {user && slot.status === 'available' ? (
              <button onClick={() => bookSlot(slot._id)} className="ml-2 bg-blue-500 text-white p-1">Book</button>
            ) : (
              <span className="ml-2 text-gray-500">({slot.status})</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slots;