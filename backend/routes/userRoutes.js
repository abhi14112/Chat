import express from "express";
import { protectRoute } from "../middlewares/authmiddleware.js";
import { getOtherUsers } from "../controllers/userController.js"
const Router = express.Router();
Router.get("/", protectRoute, getOtherUsers);
export default Router;