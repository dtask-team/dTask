// Use ESM import if you're using `type: "module"` in package.json
import mongoose from 'mongoose';

// ----------- CLIENT MODEL -----------
const clientSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  wallet: { type: String },
  password: { type: String },
  address: { type: String }, // ✅ Added address field
});
const Client = mongoose.model('Client', clientSchema);

// ----------- EXPORTING ALL MODELS -----------
export { Client};
