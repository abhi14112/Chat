import express from "express";
const router = express.Router();
import { signUp, login, logout, getCurrentUser } from "../controllers/authControllers.js";
import { protectRoute } from "../middlewares/authmiddleware.js"
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout)
router.get("/me", protectRoute, getCurrentUser)
export default router;
