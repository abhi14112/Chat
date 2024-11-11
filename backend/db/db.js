import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb Connected successfully");
    } catch (error) {
        console.log("Error while connecting database", error.message);
        process.exit(1);
    }
}