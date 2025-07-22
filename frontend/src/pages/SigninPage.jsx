import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dTaskLogo from '../assets/logo.png';

const SigninPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid @gmail.com address');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Server error. Please try again later.');
        return;
      }

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('role', data.user.role);

      const role = data.user.role;
      navigate(role === 'Client' ? '/client-landing' : '/freelancer-landing');
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-white">
      {/* ✅ Header matching LandingPage */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
        <div className="flex items-center space-x-4 overflow-hidden h-16">
          <img
            src={dTaskLogo}
            alt="dTask Logo"
            className="h-12 w-auto object-contain rounded-md"
          />
        </div>
        <nav className="flex items-center space-x-4 text-sm sm:text-base font-semibold text-gray-700">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition">
            Home
          </button>
          <span className="text-gray-600 hidden sm:inline">New here?</span>
          <button
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:text-blue-700 transition"
          >
            Register
          </button>
        </nav>
      </header>

      {/* ✅ Sign-in form */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-xl mt-10">
          <h2 className="text-2xl font-semibold text-center mb-6 text-blue-900">
            Sign In
          </h2>
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (@gmail.com only)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </span>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
