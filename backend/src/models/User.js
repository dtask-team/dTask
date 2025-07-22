import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  location: { type: String, default: '' },
  password: { type: String, required: true },
  role: { type: String, enum: ['Client', 'Freelancer'], required: true },
  walletAddress: { type: String, required: true }, 
}, { timestamps: true });

// ✅ Allow unique (walletAddress + role) combo
userSchema.index({ walletAddress: 1, role: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
export default User;
