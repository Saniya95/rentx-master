'use client';
import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaRegClock, FaTruck, FaCommentDots } from 'react-icons/fa';
import { api } from '@/utils/api';

export default function BookingForm({ rentalId }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    altPhone: '',
    address: '',
    deliveryMethod: 'Pickup',
    preferredTime: '',
    specialRequests: '',
    pickupDate: '',
    returnDate: ''
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpError, setOtpError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await api.get(`/rentals/${rentalId}`);
        setProduct(data);
      } catch (err) {
        setProductError('Failed to load product info');
      } finally {
        setProductLoading(false);
      }
    }
    if (rentalId) fetchProduct();
  }, [rentalId]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
        'expired-callback': () => {}
      });
      window.recaptchaVerifier.render();
    }
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        } catch {}
      }
    };
  }, []);

  const handleSendOtp = async () => {
    setOtpError('');
    if (form.phone.length !== 10) {
      setOtpError('Enter a valid 10-digit phone number.');
      return;
    }

    try {
      const phoneNumber = '+91' + form.phone;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (err) {
      setOtpError('Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError('Enter the 6-digit OTP.');
      return;
    }
    try {
      await confirmationResult.confirm(otp);
      setOtpVerified(true);
    } catch {
      setOtpError('Invalid OTP.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!termsChecked) return setShowTerms(true);
    if (!otpVerified) return setError('Verify phone with OTP.');
    if (!form.name || !form.email || !form.pickupDate || !form.returnDate || !form.address) {
      return setError('All required fields must be filled.');
    }

    try {
      await fetch('https://rentx-backend.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...form, rentalId })
      });
      setSuccess(true);
      setTimeout(() => router.push('/bookings'), 1500);
    } catch {
      setError('Booking failed.');
    }
  };

  return (
    <Fragment>
      <style jsx global>{`
        input::placeholder,
        textarea::placeholder {
          color: #ccc !important;
          opacity: 1 !important;
        }
      `}</style>

      <div className="bg-white/5 backdrop-blur-xl text-white border border-white/10 rounded-3xl shadow-2xl p-8 w-full max-w-2xl mx-auto relative">
        <div className="mb-6 text-center">
          {productLoading ? (
            <div className="text-lg text-gray-300">Loading product info...</div>
          ) : productError ? (
            <div className="text-lg text-red-500">{productError}</div>
          ) : product ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F5E6C8] font-playfair">
                {product.title || 'Product'}
              </h2>
              <p className="text-sm text-yellow-500 italic">{product.category}</p>
            </>
          ) : null}
        </div>

        <h2 className="text-2xl font-bold text-[#F5E6C8] mb-6 font-playfair text-center">
          Book Your Product
        </h2>

        {error && <div className="mb-4 p-3 bg-red-500/10 text-red-300 border border-red-500 rounded">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-500/10 text-green-300 border border-green-500 rounded animate-bounce">Booking successful!</div>}

        <div id="recaptcha-container" className="absolute bottom-0 z-[-1]" />

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Full Name', icon: FaUser, name: 'name', required: true },
            { label: 'Email', icon: FaEnvelope, name: 'email', type: 'email', required: true },
            { label: 'Phone Number', icon: FaPhone, name: 'phone', required: true },
            { label: 'Alternate Phone', icon: FaPhone, name: 'altPhone' },
            { label: 'Preferred Time', icon: FaRegClock, name: 'preferredTime', type: 'time' },
            { label: 'Pickup Date', name: 'pickupDate', type: 'date', required: true },
            { label: 'Return Date', name: 'returnDate', type: 'date', required: true }
          ].map((field, idx) => (
            <div className="flex flex-col" key={idx}>
              <label className="mb-1 text-sm text-[#F5E6C8] font-medium flex items-center gap-2">
                {field.icon && <field.icon className="text-yellow-500" />}
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={form[field.name]}
                onChange={e =>
                  setForm(prev => ({ ...prev, [field.name]: e.target.value }))
                }
                className="bg-white/10 text-white placeholder:text-gray-300 border border-white/10 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required={field.required}
              />
            </div>
          ))}

          {/* OTP Handling */}
          <div className="col-span-2 flex flex-col gap-2">
            {otpSent && !otpVerified && (
              <>
                <label className="text-sm text-[#F5E6C8]">Enter OTP</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="bg-white/10 text-white placeholder:text-gray-300 border border-white/10 px-4 py-2 rounded w-full"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Verify
                  </button>
                </div>
                {otpError && <p className="text-xs text-red-400">{otpError}</p>}
              </>
            )}

            {!otpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={form.phone.length !== 10}
                className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded font-semibold transition"
              >
                Send OTP
              </button>
            )}

            {otpVerified && <p className="text-xs text-green-400">Phone verified ✅</p>}
          </div>

          {/* Address */}
          <div className="col-span-2 flex flex-col">
            <label className="mb-1 text-sm text-[#F5E6C8] font-medium flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-500" /> Address <span className="text-red-400">*</span>
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              required
              className="bg-white/10 text-white placeholder:text-gray-300 border border-white/10 px-4 py-2 rounded min-h-[60px]"
            />
          </div>

          {/* Delivery Method */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-[#F5E6C8] font-medium flex items-center gap-2">
              <FaTruck className="text-yellow-500" /> Delivery Method
            </label>
            <div className="flex gap-4">
              {['Pickup', 'Delivery'].map(option => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value={option}
                    checked={form.deliveryMethod === option}
                    onChange={e => setForm({ ...form, deliveryMethod: e.target.value })}
                    className="accent-yellow-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div className="col-span-2 flex flex-col">
            <label className="mb-1 text-sm text-[#F5E6C8] font-medium flex items-center gap-2">
              <FaCommentDots className="text-yellow-500" /> Special Requests
            </label>
            <textarea
              name="specialRequests"
              value={form.specialRequests}
              onChange={e => setForm({ ...form, specialRequests: e.target.value })}
              className="bg-white/10 text-white placeholder:text-gray-300 border border-white/10 px-4 py-2 rounded min-h-[60px]"
            />
          </div>

          <button
            type="submit"
            className="col-span-2 bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-xl font-bold text-lg transition"
          >
            Book Now
          </button>
        </form>

        {/* Terms Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white/10 text-white border border-white/10 backdrop-blur-xl p-8 rounded-2xl max-w-md w-full">
              <h3 className="text-lg font-bold mb-3 text-[#F5E6C8]">Terms & Conditions</h3>
              <ul className="text-sm list-disc list-inside space-y-1 mb-4 text-gray-300">
                <li>Bookings subject to owner approval.</li>
                <li>Use responsibly and return on time.</li>
                <li>Damage or delay may incur charges.</li>
              </ul>
              <div className="flex gap-2 items-center mb-4">
                <input type="checkbox" checked={termsChecked} onChange={e => setTermsChecked(e.target.checked)} className="accent-yellow-500" />
                <label className="text-sm">I agree to the terms & conditions.</label>
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowTerms(false)} className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-600" disabled={!termsChecked}>
                  Continue
                </button>
                <button onClick={() => setShowTerms(false)} className="bg-white/20 text-white px-4 py-2 rounded font-semibold hover:bg-white/30">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
