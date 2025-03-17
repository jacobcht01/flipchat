import { Router } from "express";
import { getAnalyticsByDate, getAnalyticsByMonth } from "../controllers/analyticsController.js";



const router = Router()

router.route('/date')
    .post(getAnalyticsByDate)

router.route("/month")
    .post(getAnalyticsByMonth)

export default router;

