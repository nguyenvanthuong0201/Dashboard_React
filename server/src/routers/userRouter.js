import express from "express";
import { login, logout, register,checkAuth} from "../controller/userController.js";
import {isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
const router = express.Router();

router.route("/user/checkAuth").get(isAuthenticatedUser,checkAuth)
router.route("/user/register").post(register)
router.route("/user/login").post(login)
router.route("/user/logout").post(logout)

export default router;