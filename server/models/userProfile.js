import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  // firstname: {type: String, required:true},

  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

var UserProfile = mongoose.model("UserProfile", userSchema);

export default UserProfile;
