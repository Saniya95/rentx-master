// src/utils/api.js
// Centralized API utility for RentX frontend

// Original URL configuration
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Get the base URL based on environment
const getBaseUrl = () => {
  // Check if running in production or development
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Use environment variable if available, otherwise use a fallback
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (envUrl) return envUrl;
  
  // Fallback URLs
  return isProduction 
    ? 'https://rentx-backend-nikhil-os.vercel.app/api' // Production backend URL
    : 'http://localhost:5000/api';                     // Development backend URL
};

const API_BASE_URL = getBaseUrl();

// Get image URL with correct base path
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a relative path starting with /uploads, convert to absolute URL
  if (imagePath.startsWith('/uploads')) {
    const baseUrl = getBaseUrl().replace('/api', '');
    return `${baseUrl}${imagePath}`;
  }
  
  // Otherwise return the path as is
  return imagePath;
};

function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

async function request(endpoint, { method = 'GET', data, headers = {}, ...rest } = {}) {
  console.log(`API Request: ${method} ${API_BASE_URL}${endpoint}`);
  if (data) {
    console.log('Request data:', data);
  }
  
  const token = getToken();
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...rest,
  };
  if (data) {
    config.body = JSON.stringify(data);
  }
  
  try {
    console.log(`Fetching from: ${API_BASE_URL}${endpoint}`);
    const res = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const contentType = res.headers.get('content-type');
    
    let body;
    if (contentType && contentType.includes('application/json')) {
      try {
        body = await res.json();
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        const textResponse = await res.text();
        throw new Error(`Invalid JSON response: ${textResponse}`);
      }
    } else {
      body = await res.text();
      // For non-JSON responses, try to parse as JSON if it looks like JSON
      if (body.startsWith('{') || body.startsWith('[')) {
        try {
          body = JSON.parse(body);
        } catch (e) {
          // Not JSON, keep as text
        }
      }
    }
    
    console.log(`API Response (${res.status}):`, body);
    
    if (!res.ok) {
      const errorMessage = typeof body === 'object' && body !== null
        ? body.message || body.error || JSON.stringify(body)
        : body || `API Error: ${res.status}`;
        
      throw new Error(errorMessage);
    }
    
    return body;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    
    // Handle network errors more gracefully
    if (error.message === 'Failed to fetch') {
      console.error('Network error: Could not connect to the backend server.');
      throw new Error('Could not connect to the backend server. Please make sure the backend is running.');
    }
    
    throw error.message || error;
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, data, options) => request(endpoint, { ...options, method: 'POST', data }),
  put: (endpoint, data, options) => request(endpoint, { ...options, method: 'PUT', data }),
  del: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
};

// For file uploads (multipart/form-data)
export async function uploadFile(endpoint, file, field = 'file') {
  const token = getToken();
  const formData = new FormData();
  formData.append(field, file);
  
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    
    const contentType = res.headers.get('content-type');
    let body;
    if (contentType && contentType.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }
    
    if (!res.ok) {
      throw body?.message || body?.error || body || 'Upload Error';
    }
    
    return body;
  } catch (error) {
    console.error(`Upload Error (${endpoint}):`, error);
    if (error.message === 'Failed to fetch') {
      throw new Error('Could not connect to the backend server. Please make sure the backend is running.');
    }
    throw error;
  }
}
