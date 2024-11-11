import User from "../models/userModel.js";
export const getOtherUsers = async (req, res) => {
    try {
        const currUser = req.user;
        const users = await User.find({ _id: { $ne: currUser._id } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("Error getting other users", error.message);
        res.status(500).json({ message: "Error getting other users" });
    }
}