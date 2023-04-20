import express from "express";
import { login, logout, register} from "../controller/userController.js";
import {isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
const router = express.Router();

router.route("/user/register").post(register)
router.route("/user/login").post(login)
router.route("/user/logout").get(logout)

export default router;