import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// ✅ REGISTER CONTROLLER
export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      password,
      confirmPassword,
      role,
      wallet,
    } = req.body;

    console.log("🔵 Incoming registration data:", req.body);

    // ✅ Required fields check (location removed)
    if (!fullName || !email || !phone || !password || !confirmPassword || !role || !wallet) {
      console.log("⚠️ Missing fields:", {
        fullName, email, phone, password, confirmPassword, role, wallet
      });
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // ✅ Email already exists?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // ✅ Wallet already used for same role?
    const existingWalletRole = await User.findOne({ walletAddress: wallet, role });
    if (existingWalletRole) {
      return res.status(400).json({ message: `${role} already registered with this wallet` });
    }

    // ✅ Passwords match?
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // ✅ Role valid?
    if (!['Client', 'Freelancer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role selected' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user (location optional)
    let newUser;
    try {
      newUser = await User.create({
        fullName,
        email,
        phone,
        location: location || '', // <- optional fallback
        password: hashedPassword,
        role,
        walletAddress: wallet,
      });
    } catch (createErr) {
      console.error("❌ Error during User.create():", createErr);
      return res.status(500).json({ message: 'Database error', error: createErr.message });
    }

    // ✅ Generate JWT token
    const token = generateToken({ id: newUser._id, role: newUser.role });

    // ✅ Success response
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });

  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// ✅ LOGIN CONTROLLER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({ id: user._id, role: user.role });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// ✅ GET PROFILE CONTROLLER
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error("❌ Get Profile Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET ME CONTROLLER (fixed for multiple wallet roles)
export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
      role: req.user.role // ✅ Match by role too
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found for this role' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ GetMe Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
