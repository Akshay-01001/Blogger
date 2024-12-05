import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_pic:{
    type : String,
    default : null
  }
},{
    timestamps : true,
});

const userModel =  mongoose.models.user || mongoose.model('user',userSchema)

export default userModel