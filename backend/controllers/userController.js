import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { username, email, password1 ,password2} = req.body;
  const profile_pic = req.file?.path;

  try {
    if (!username || !email || !password1 || !password2) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    if(password1 != password2){
      return res.status(404).json({success:false,message:"Password Does Not Match"})
    }

    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);

    const userData = {
      username,
      email,
      password: hashedPassword,
      profile_pic,
    };

   
    const newUser = await userModel.create(userData);
    
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECREAT || "secret",
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      success:true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profile_pic: newUser.profile_pic,
      },
      token,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Missing Details" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Does Not Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid Password" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECREAT, {
        expiresIn: "1d",
      });
      return res
        .status(200)
        .json({
          success: true,
          message: "Login Successful",
          token,
          user: {
            name: user.username,
            profile_pic: user.profile_pic,
            email: user.email,
          },
        });
    }
  } catch (error) {
    return res.status(200).json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser };