import { NextResponse } from "next/server";
import User from "../Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User Register
export const register = async (req) => {
  const { name, email, password } = await req.json();

  try {
    let user = await User.findOne({ email });

    if (user)
      return NextResponse.json({
        message: "User already exist",
        success: false,
      });

    const hashedPassword=await bcrypt.hash(password,10);

    user=await User.create({name,email,password:hashedPassword});

    return NextResponse.json({
      message: "User Registered Successfully..!",
      user,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: "server error", error: error.message });
  }
};

// user login
export const login = async (req) => {
  const { email, password } = await req.json();
  try {
    let user = await User.findOne({email});
    if (!user) return NextResponse.json({ message: "User not exist", success: false });

    const validPass=await bcrypt.compare(password,user.password);

if(!validPass)return NextResponse.json({ message: "Wrong Password",success: false,});

const token = jwt.sign({ id: user._id },"!@#",{expiresIn: "1d",});

    return NextResponse.json({
      message: `Welcome back ${user.name}`,
      user,
      token,
      success:true
    });
  } catch (error) {
    return NextResponse.json({ message: "server error", error: error.message });
  }
};