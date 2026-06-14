import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  userId: { type: String, required: true },
  country: { type: String, required: true },
  passwordHash: { type: String, required: true },
  referralCode: { type: String, required: true },
  verified: { type: Boolean, default: false },
  productsSold: { type: Number, default: 0 },
  referralsSold: { type: Number, default: 0 },
  commission: { type: Number, default: 0 },
  verificationCode: { type: String, default: null } // ✅ safe with null
});

export default mongoose.model("User", userSchema);
