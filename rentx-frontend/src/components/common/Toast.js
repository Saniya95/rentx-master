import React, { useEffect } from 'react';

export default function Toast({ message, onClose, type = 'error' }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 px-6 py-4 rounded-xl shadow-lg flex items-center justify-between gap-4 z-50 animate-fadeIn ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white font-bold text-lg">×</button>
    </div>
  );
}
