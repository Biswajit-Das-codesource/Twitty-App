import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:String,
    required:true
  },
  follower:{
    type:Array,
    default:[]
  },
  following:{
    type:Array,
    default:[]
  },
  bookmarks:{
    type:Array,
    default:[]
  }
})



const userModel = mongoose.model("user",userSchema)


export default userModel;