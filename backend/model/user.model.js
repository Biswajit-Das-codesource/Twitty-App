import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  bookmarks: {
    type: Array,
    default: [],
  },
  profileViews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }
  ],
  bio:{
    type:String
  },
  
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
