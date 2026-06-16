import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  phone: { type: String, required: true, match: /^[0-9]{8,15}$/ },
  userId: { type: String, required: true, index: true },
  country: { type: String, required: true },
  passwordHash: { type: String, required: true },
  referralCode: { type: String, required: true, index: true },
  verified: { type: Boolean, default: false },
  productsSold: { type: Number, default: 0, min: 0 },
  referralsSold: { type: Number, default: 0, min: 0 },
  commission: { type: Number, default: 0, min: 0 }, // ✅ integer commission
  verificationCode: { type: String, default: null }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
