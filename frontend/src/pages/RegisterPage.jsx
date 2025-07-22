import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Wallet, Eye, EyeOff } from 'lucide-react';
import dTaskLogo from "../assets/logo.png";
import { Toaster, toast } from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    fullName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone' && !/^[0-9]{0,10}$/.test(value)) return;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const connectWallet = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(true);
      setWalletAddress('0x742d35Cc6634C0532925a3b8D0C5f0226f0E56DA');
      setIsLoading(false);
    }, 1000);
  };

  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
  const isStrongPassword = (password) =>
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!isConnected) newErrors.wallet = 'Please connect your wallet first';
    if (!isValidEmail(formData.email)) newErrors.email = 'Email must be a valid @gmail.com address';
    if (!isValidPhone(formData.phone)) newErrors.phone = 'Phone number must be exactly 10 digits';
    if (!isStrongPassword(formData.password)) newErrors.password = 'Password must be at least 8 characters, include one uppercase letter and one number';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'Please accept the terms and conditions';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:4000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            wallet: walletAddress,
            role: selectedRole
          })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("role", data.user.role);
          toast.success("Registration successful!");
          navigate(data.user.role === "Client" ? "/client-landing" : "/freelancer-landing");
        } else {
          toast.error(data.message || "Registration failed.");
        }
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderError = (field) =>
    errors[field] && <p className="text-sm text-red-600 mt-1">{errors[field]}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-white">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center overflow-hidden h-16">
          <img
            src={dTaskLogo}
            alt="dTask Logo"
            className="h-12 w-auto object-contain rounded-md"
          />
        </div>
        <div className="flex items-center space-x-4 text-sm sm:text-base font-semibold text-gray-700">
          <button onClick={() => navigate("/")} className="hover:text-blue-600 transition">
            Home
          </button>
          <span className="text-gray-600 hidden sm:inline">Already have an account?</span>
          <button onClick={() => navigate("/signin")} className="text-blue-600 hover:text-blue-700 transition">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl">
          {!selectedRole ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Join dTask</h1>
              <div className="grid md:grid-cols-2 gap-6">
                <div onClick={() => setSelectedRole("Client")} className="cursor-pointer p-6 border rounded-lg hover:border-blue-500 transition">
                  <Briefcase className="text-blue-600 mb-3 w-6 h-6" />
                  <h2 className="font-semibold mb-1">I'm a Client</h2>
                  <p className="text-sm text-gray-600">Hire freelancers for your projects.</p>
                </div>
                <div onClick={() => setSelectedRole("Freelancer")} className="cursor-pointer p-6 border rounded-lg hover:border-purple-500 transition">
                  <User className="text-purple-600 mb-3 w-6 h-6" />
                  <h2 className="font-semibold mb-1">I'm a Freelancer</h2>
                  <p className="text-sm text-gray-600">Find work and build your Web3 career.</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedRole === "Client" ? "Client" : "Freelancer"} Registration
              </h2>

              <div className="border p-4 rounded-lg bg-blue-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-blue-600" />
                  {isConnected ? (
                    <p className="text-green-600 text-sm">Connected: {walletAddress.slice(0, 10)}...</p>
                  ) : (
                    <p className="text-sm text-gray-700">Please connect your wallet</p>
                  )}
                </div>
                <button
                  type="button"
                  disabled={isConnected || isLoading}
                  onClick={connectWallet}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                  {isConnected ? "Connected" : "Connect Wallet"}
                </button>
              </div>
              {renderError("wallet")}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (@gmail.com) <span className="text-red-500">*</span>
                </label>
                <input name="email" value={formData.email} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" required />
                {renderError("email")}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (10 digits) <span className="text-red-500">*</span>
                </label>
                <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" required />
                {renderError("phone")}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input name="location" value={formData.location} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input name="password" value={formData.password} onChange={handleInputChange} type={showPassword ? "text" : "password"} className="w-full border px-3 py-2 rounded pr-10" required />
                  <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                    {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </span>
                </div>
                {renderError("password")}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} type={showConfirmPassword ? "text" : "password"} className="w-full border px-3 py-2 rounded pr-10" required />
                  <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                    {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </span>
                </div>
                {renderError("confirmPassword")}
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleInputChange} />
                <label className="text-sm">
                  I agree to the <a href="/terms" className="text-blue-600 underline">Terms</a> and <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a> <span className="text-red-500">*</span>
                </label>
              </div>
              {renderError("termsAccepted")}

              <button type="submit" disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-full py-3 rounded-md font-semibold hover:from-blue-700 hover:to-indigo-700 transition">
                {isLoading ? "Creating Account..." : "Create My dTask Account"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
