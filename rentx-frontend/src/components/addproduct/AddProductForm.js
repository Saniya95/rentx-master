'use client';

import { Fragment, useState, useEffect } from 'react';
import { api, uploadFile } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { auth, setupRecaptcha } from '@/utils/firebase';
import { signInWithPhoneNumber } from 'firebase/auth';
import Image from 'next/image';

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center justify-between gap-4 z-50 animate-fadeIn">
      <span>{message}</span>
      <button onClick={onClose} className="text-white font-bold text-lg">×</button>
    </div>
  );
}

export default function AddProductForm() {
  const [form, setForm] = useState({ 
    name: '', 
    category: '', 
    price: '', 
    location: '', 
    phone: '',
    description: '' 
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const [imageFiles, setImageFiles] = useState([null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null]);

  const categories = [
    { value: "accessories", label: "Accessories" },
    { value: "decor", label: "Decor" },
    { value: "electronics", label: "Electronics" },
    { value: "vehicles", label: "Vehicles" },
    { value: "furniture", label: "Furniture" },
    { value: "sports", label: "Sports & Equipment" },
    { value: "fashion", label: "Fashion" },
    { value: "female", label: "Female Fashion" },
    { value: "male", label: "Male Fashion" },
    { value: "kids", label: "Kids" }
  ];

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const verifier = setupRecaptcha('recaptcha-container');
        if (verifier) {
          window.recaptchaVerifier = verifier;
        }
      } catch (error) {
        console.error('Recaptcha setup error:', error);
        setOtpError('Failed to initialize verification system. Please refresh the page.');
      }
    }
  }, []);

  const handleSendOtp = async () => {
    const phone = '+91' + form.phone;
    if (!form.phone || form.phone.length !== 10) return;
    if (!form.phone.endsWith('9280')) {
      setShowToast(true);
      return;
    }

    try {
      setLoading(true);
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (error) {
      console.error('[ERROR] Failed to send OTP:', error);
      setOtpError('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError('');
    if (!otp || otp.length !== 6) {
      setOtpError('Enter the 6-digit OTP.');
      return;
    }
    try {
      await confirmationResult.confirm(otp);
      setOtpVerified(true);
    } catch (err) {
      setOtpError('Invalid OTP.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, file) => {
    const updatedFiles = [...imageFiles];
    updatedFiles[index] = file;
    setImageFiles(updatedFiles);

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedPreviews = [...imagePreviews];
      updatedPreviews[index] = reader.result;
      setImagePreviews(updatedPreviews);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setError('Please verify your phone number before adding the product.');
      return;
    }
    if (!termsChecked) {
      setShowTerms(true);
      return;
    }
    if (!form.name || !form.category || !form.price || !form.location || !form.phone) {
      setError('Please fill all required fields.');
      return;
    }

    setError('');
    setLoading(true);

    let imageUrls = [];
    try {
      for (const file of imageFiles) {
        if (!file) {
          setError('Please upload all 3 images.');
          setLoading(false);
          return;
        }
        const uploadRes = await uploadFile('/upload', file, 'file');
        imageUrls.push(uploadRes.url);
      }

      await api.post('/rentals', {
        title: form.name,
        category: form.category.toLowerCase().trim(),
        description: form.description || '',
        price: form.price,
        location: form.location,
        phone: form.phone,
        image: imageUrls[0],
        image2: imageUrls[1],
        image3: imageUrls[2]
      });

      setSuccess(true);
      setForm({ name: '', category: '', price: '', location: '', phone: '', description: '' });
      setImageFiles([null, null, null]);
      setImagePreviews([null, null, null]);
      setOtpSent(false);
      setOtpVerified(false);
      setOtp('');
      setTimeout(() => router.push(`/${form.category}`), 1500);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to add product.');
    }
  };

  const detectLocation = () => {
    setLocationLoading(true);
    setLocationError('');
    const getLocationByIP = async () => {
      try {
        const response = await fetch(`https://ipapi.co/json/`);
        const data = await response.json();
        if (data && data.city) {
          const locationString = `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`;
          setForm(prev => ({ ...prev, location: locationString.replace(/^, /, '').replace(/, $/, '') }));
        } else {
          throw new Error("Could not get location data");
        }
      } catch (error) {
        setLocationError("Could not detect your location. Please enter manually.");
      } finally {
        setLocationLoading(false);
      }
    };

    if (navigator.geolocation) {
      const timeoutId = setTimeout(() => {
        getLocationByIP();
      }, 5000);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          clearTimeout(timeoutId);
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
            const data = await response.json();
            if (data && data.address) {
              const address = data.address;
              const city = address.city || address.town || address.village || address.hamlet || '';
              const state = address.state || address.county || '';
              const country = address.country || '';
              const locationString = `${city}, ${state}, ${country}`;
              setForm(prev => ({ ...prev, location: locationString.replace(/^, /, '').replace(/, $/, '').replace(/, , /g, ', ') }));
              setLocationLoading(false);
              return;
            }
            await getLocationByIP();
          } catch {
            setLocationError("Could not detect your location. Please enter manually.");
            setLocationLoading(false);
          }
        },
        () => {
          clearTimeout(timeoutId);
          getLocationByIP();
        },
        { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
      );
    } else {
      getLocationByIP();
    }
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Add a Product</h2>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">Product added successfully!</div>}

        <form onSubmit={handleSubmit} autoComplete="off" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-4">
            <input required type="text" name="name" placeholder="Product Name*" className="form-input w-full text-black border px-3 py-2" value={form.name} onChange={handleChange} />
            <select required name="category" className="form-select w-full text-black border px-3 py-2" value={form.category} onChange={handleChange}>
              <option value="">Select Category*</option>
              {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
            </select>
            <input required type="number" name="price" placeholder="Price (₹/day)*" min="1" className="form-input w-full text-black border px-3 py-2" value={form.price} onChange={handleChange} />
            <div className="flex gap-2">
              <input required type="text" name="location" placeholder="Location*" className="form-input flex-1 text-black border px-3 py-2" value={form.location} onChange={handleChange} />
              <button type="button" onClick={detectLocation} disabled={locationLoading} className="btn bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 rounded-md">{locationLoading ? '...' : 'Detect'}</button>
            </div>
            {locationError && <p className="text-xs text-red-500">{locationError}</p>}
            <textarea name="description" className="form-textarea w-full text-black border px-3 py-2" rows="4" placeholder="Description (optional)" value={form.description} onChange={handleChange}></textarea>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <input type="tel" name="phone" required placeholder="Phone Number*" className="form-input flex-1 text-black border px-3 py-2" value={form.phone} onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                setForm({ ...form, phone: val });
                setOtpSent(false);
                setOtpVerified(false);
                setOtp('');
              }} />
              <button type="button" onClick={handleSendOtp} disabled={otpSent || form.phone.length !== 10} className={`btn px-4 py-2 rounded-md ${otpSent ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>Send OTP</button>
            </div>
            {otpSent && !otpVerified && (
              <div>
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} maxLength={6} className="form-input w-full text-black border px-3 py-2" placeholder="Enter 6-digit OTP" />
                <button type="button" onClick={handleVerifyOtp} className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-2">Verify</button>
                {otpError && <div className="text-sm text-red-600 mt-1">{otpError}</div>}
              </div>
            )}
            {otpVerified && <div className="text-green-600 text-sm font-medium">✓ Phone number verified!</div>}

            <div>
              <label className="block font-medium text-gray-700 mb-1">Upload 3 Images*</label>
              {[0, 1, 2].map((index) => (
                <div key={index} className="mb-3">
                  <input type="file" required accept="image/*" onChange={(e) => handleImageChange(index, e.target.files[0])} className="form-input w-full text-black border px-3 py-2" />
                  {imagePreviews[index] && (
                    <div className="mt-2">
                      <Image src={imagePreviews[index]} alt={`Preview ${index + 1}`} width={200} height={150} className="object-contain border rounded-md" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center mt-4">
              <input type="checkbox" id="terms" checked={termsChecked} onChange={e => setTermsChecked(e.target.checked)} className="mr-2" />
              <label htmlFor="terms" className="text-gray-700 text-sm">I agree to the <button type="button" className="text-blue-600 underline" onClick={() => setShowTerms(true)}>terms and conditions</button></label>
            </div>

            <button type="submit" className="btn w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 rounded-md font-medium mt-4" disabled={loading}>{loading ? 'Adding Product...' : 'Add Product'}</button>
          </div>
        </form>

        {showToast && (
          <Toast message="Please enter a valid test phone number ending with ******9280" onClose={() => setShowToast(false)} />
        )}

        {showTerms && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
              <h3 className="text-xl font-bold mb-4 text-emerald-900">Terms and Conditions</h3>
              <ol className="list-decimal list-inside text-gray-700 text-sm mb-4 space-y-1">
                <li>You confirm that you are the owner of this item or authorized to rent it.</li>
                <li>The item must be in good, working condition as described.</li>
                <li>You are responsible for the accuracy of the listing details.</li>
                <li>You agree to respond to rental inquiries within 24 hours.</li>
                <li>You will not discriminate against any potential renters.</li>
                <li>You must disclose any defects or issues with the item.</li>
                <li>You agree to the platforms commission structure.</li>
                <li>You will comply with all applicable laws and regulations.</li>
                <li>The platform is not responsible for any damages or disputes.</li>
                <li>You can remove your listing at any time if not currently rented.</li>
              </ol>
              <div className="flex gap-2">
                <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded font-medium" onClick={() => { setTermsChecked(true); setShowTerms(false); }}>Accept & Continue</button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-medium" onClick={() => setShowTerms(false)} type="button">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div id="recaptcha-container" style={{ position: 'absolute', bottom: 0, zIndex: -1, height: 0 }} />
      </div>
    </Fragment>
  );
}
