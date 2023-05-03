import express from "express";
import { login, logout, register, checkAuth, getListUser } from "../controller/userController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import { ROLE_ADMIN } from "../constant/index.js";
const router = express.Router();

router.route("/user/checkAuth").get(isAuthenticatedUser, checkAuth)
router.route("/user/register").post(register)
router.route("/user/login").post(login)
router.route("/user/logout").post(logout)
router.route("/users").get(isAuthenticatedUser, authorizeRoles(ROLE_ADMIN), getListUser)

export default router;