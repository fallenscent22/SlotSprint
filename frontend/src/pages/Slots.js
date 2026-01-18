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
  const { user, setUser } = useContext(AuthContext);
  console.log('Auth context value:', { user, setUser });
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

  const bookSlot = async (slotId) => {
    setError('');
    try {
    const res = await axios.post(
      '/api/v1/bookings',
      { slotId },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    if (res.data.success) {
      navigate('/confirmation', { state: { message: 'Booking successful!' } });
      // Optional: refresh slots after success
      fetchSlots();
    }
  } catch (err) {
    const msg = err.response?.data?.message || 'Booking failed';
    setError(msg);

    if (err.response?.status === 401) {
      // Token invalid/expired → logout & redirect
      localStorage.removeItem('token');
      setUser(null); // if you have setUser in context
      navigate('/login');
    }
  }
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
          <li
            key={slot._id}
            className={`p-4 rounded shadow text-center
    ${slot.status === 'available' ? 'bg-green-100' :
                slot.status === 'booked' ? 'bg-red-100' :
                  'bg-gray-200 opacity-60'}`}
          >
            <div className="font-medium">{slot.startTime} – {slot.endTime}</div>

            {slot.status === 'past' && (
              <div className="text-sm text-gray-600 mt-1">Past slot</div>
            )}

            {slot.status === 'booked' && (
              <div className="text-sm text-red-600 mt-1">Already booked</div>
            )}

            {slot.status === 'available' && (
              <>
                {user ? (
                  <button
                    onClick={() => bookSlot(slot._id)}
                    className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    disabled={loading} // optional: disable while any request is in progress
                  >
                    Book
                  </button>
                ) : (
                  <div className="mt-2 text-sm text-gray-500 italic">
                    Login to book this slot
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slots;