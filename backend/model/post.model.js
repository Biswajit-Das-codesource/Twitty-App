import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  photoUrl:{
    type:String
  },
  message: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comment: [
    {
      text: String ,
      commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
},{timestamps:true});


const postModel = mongoose.model("posts", postSchema);

export default postModel;
