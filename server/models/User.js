import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  postalCode: String,
  phone: String,
  email: String,
  membershipStart: { type: Date, default: Date.now() },
});

export default mongoose.model("Users", UserSchema);
