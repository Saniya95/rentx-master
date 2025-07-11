'use client';
import { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [extendDays, setExtendDays] = useState({});
  const [updating, setUpdating] = useState({});
  const [showCost, setShowCost] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      setError('');
      try {
        const data = await api.get('/bookings');
        setBookings(data);
      } catch (err) {
        setError(typeof err === 'string' ? err : (err.message || 'Failed to load bookings.'));
      }
      setLoading(false);
    }
    fetchBookings();
  }, []);

  if (loading) return <div className="text-center py-10 text-white">Loading bookings...</div>;
  if (error) return <div className="text-center py-10 text-red-400">{error}</div>;
  if (!bookings.length) return <div className="text-center py-10 text-white">No bookings found.</div>;

  return (
    <section className="py-12 min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-amber-400 font-playfair drop-shadow">My Bookings</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {bookings.map((b, idx) => {
          let start = new Date(b.pickupDate || b.startDate);
          let end = new Date(b.returnDate || b.endDate);

          if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            start = new Date();
            end = new Date();
          }

          const today = new Date();
          today.setHours(0, 0, 0, 0);
          start.setHours(0, 0, 0, 0);
          end.setHours(0, 0, 0, 0);

          let totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
          let daysLeft = today < start ? totalDays : today > end ? 0 : Math.ceil((end - today) / (1000 * 60 * 60 * 24)) + 1;

          const pricePerDay = b.rental?.price || 0;
          const totalPrice = pricePerDay * totalDays;

          return (
            <div
              key={b._id || idx}
              className="relative backdrop-blur-md bg-white/10 border border-amber-100 p-6 rounded-2xl shadow-lg hover:shadow-amber-500/30 transition duration-300 group"
              onClick={() => router.push(`/bookings/${b._id}`)}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') router.push(`/bookings/${b._id}`); }}
              aria-label={`View details for booking ${b.rental?.title || b.item}`}
            >
              <div className="absolute top-2 right-2 text-xs bg-amber-100 text-black px-3 py-1 rounded-full font-semibold group-hover:bg-amber-400 group-hover:text-black">
                View Details
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-amber-200 bg-black/20">
                  {b.rental?.image && (
                    <Image
                      src={b.rental.image.startsWith('http') ? b.rental.image : `https://rentx-backend.onrender.com/${b.rental.image}`}
                      alt={b.rental?.title || 'Rental image'}
                      className="object-cover w-full h-full"
                      width={500}
                      height={300}
                      unoptimized
                    />
                  )}
                </div>
                <div>
                  <div className="text-lg font-semibold text-amber-300 tracking-wide">
                    {b.rental?.title || b.rental?.name || b.item}
                  </div>
                  <div className="text-sm text-gray-300 italic">{b.rental?.location}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm mb-3 text-white/90">
                <div><span className="font-bold text-amber-300">Start:</span> {start.toLocaleDateString()}</div>
                <div><span className="font-bold text-amber-300">End:</span> {end.toLocaleDateString()}</div>
                <div><span className="font-bold text-amber-300">Status:</span> 
                  <span className={`font-bold ${b.status === 'Active' ? 'text-green-400' : 'text-yellow-400'}`}> {b.status || 'Pending'}</span>
                </div>
                <div><span className="font-bold text-amber-300">Total Days:</span> {totalDays}</div>
                <div><span className="font-bold text-amber-300">Days Left:</span> 
                  <span className={`${daysLeft <= 2 ? 'text-red-400' : 'text-green-300'} font-semibold`}> {daysLeft}</span>
                </div>
                <div><span className="font-bold text-amber-300">Price/Day:</span> ₹{pricePerDay}</div>
                <div className="col-span-2 md:col-span-1"><span className="font-bold text-amber-300">Total Price:</span> ₹{totalPrice}</div>
              </div>

              {showCost[b._id] && extendDays[b._id] > 0 && (
                <div className="mb-3 bg-amber-100/10 text-amber-300 p-3 rounded-lg text-center font-semibold text-sm">
                  Extension Cost: ₹{pricePerDay * Number(extendDays[b._id])}<br />
                  New Total Price: ₹{pricePerDay * (totalDays + Number(extendDays[b._id]))}
                </div>
              )}

              <button
                className="mt-2 w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:to-amber-400 text-black font-bold py-2 rounded-lg shadow hover:shadow-amber-400 transition"
                onClick={e => { e.stopPropagation(); router.push(`/payment?bookingId=${b._id}`); }}
              >
                Pay Now
              </button>

              <div className="mt-5 pt-4 border-t border-amber-200 flex flex-col md:flex-row md:items-center gap-3">
                <div className="font-semibold text-amber-300">Extend Booking</div>
                <input
                  type="number"
                  min={1}
                  placeholder="Days to extend"
                  className="border border-amber-300 px-3 py-2 rounded-lg w-28 bg-black/10 text-white focus:ring-amber-400"
                  value={extendDays[b._id] || ''}
                  onChange={e => setExtendDays({ ...extendDays, [b._id]: e.target.value })}
                  disabled={updating[b._id]}
                />
                <button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-semibold transition shadow"
                  disabled={updating[b._id] || !extendDays[b._id] || extendDays[b._id] < 1}
                  onClick={async e => {
                    e.stopPropagation();
                    setShowCost({ ...showCost, [b._id]: true });
                    setUpdating({ ...updating, [b._id]: true });
                    try {
                      const newEnd = new Date(end);
                      newEnd.setDate(newEnd.getDate() + Number(extendDays[b._id]));
                      await api.put(`/bookings/${b._id}`, {
                        endDate: newEnd.toISOString().split('T')[0],
                      });
                      const data = await api.get('/bookings');
                      setBookings(data);
                      setExtendDays({ ...extendDays, [b._id]: '' });
                      setShowCost({ ...showCost, [b._id]: false });
                    } catch (err) {
                      console.error("Error extending booking:", err);
                      alert('Failed to extend booking. Please try again later.');
                    } finally {
                      setUpdating({ ...updating, [b._id]: false });
                    }
                  }}
                >
                  Extend
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
