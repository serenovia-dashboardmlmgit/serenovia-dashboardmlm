import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    phone: String,
    userId: String,
    country: String,
    passwordHash: String,
    referralCode: String,
    verified: { type: Boolean, default: false },
    productsSold: { type: Number, default: 0 },
    referralsSold: { type: Number, default: 0 },
    commission: { type: Number, default: 0 },
    verificationCode: String
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map