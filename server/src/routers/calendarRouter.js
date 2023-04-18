import express from "express";
import { updateCalendar, getCalendar} from "../controller/calendarController.js";
const router = express.Router();

router.route("/calendar/:id").put(updateCalendar);
router.route("/calendar/:id").get(getCalendar);

export default router;