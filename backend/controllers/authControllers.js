import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/tokenAndCookie.js";
export const getCurrentUser = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.log("Error in getting current user", error);
        res.status(500).json({ message: "server error" })
    }
}
export const signUp = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = new User({
            fullname,
            email,
            password: hashedPassword,
            profilePicture: `https://avatar.iran.liara.run/public/boy?${fullname}`
        })
        if (userData) {
            generateTokenAndSetCookie(userData._id, res);
            userData.save();
            return res.status(201).json({
                _id: userData._id,
                fullname,
                email,
                profilePicture: userData.profilePicture,
            });
        } else {
            return res.status(400).json({ message: "Invalid userdata" });
        }
    } catch (error) {
        console.log("Error while signup", error);
        return res.status(500).json({ message: error.message });
    }

}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isValidPassword = await bcrypt.compare(password, user?.password || "");
        if (!user || !isValidPassword) {
            return res.status(404).json({ message: "Invalid Email or password" });
        } else {
            generateTokenAndSetCookie(user._id, res);
            return res.status(200).json({
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                profilePicture: user.profilePicture
            })
        }
    } catch (error) {
        console.log("Error while Login", error);
        return res.status(500).json({ message: error.message });
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Log Out Successfully" });
    } catch (error) {
        console.log("Error while Logout", error);
        return res.status(500).json({ message: error.message });
    }
}