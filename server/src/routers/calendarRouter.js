import express from "express";
import { updateCalendar, getCalendar} from "../controller/calendarController.js";
import {isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
const router = express.Router();

router.route("/calendar/:id").put(updateCalendar);
router.route("/calendar/:id").get(isAuthenticatedUser,getCalendar);

export default router;