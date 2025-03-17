import { Router } from "express";
import { getUser, updateUserDetails, updateUserPassword } from "../controllers/userController.js";


const router = Router()

router.route("/:id")
    .get(getUser)

router.route("/update")
    .patch(updateUserDetails)

router.route("/update/password")
    .patch(updateUserPassword)

export default router;