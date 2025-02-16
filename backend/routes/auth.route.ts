import { Router } from "express"
// @ts-ignore
import { config } from "../config/app.config"
import {registerUserController} from "../controllers/auth.controller"
const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
const authRoutes: Router = Router()
authRoutes.post("/register", registerUserController)
// authRoutes.post("/login", loginController);
// authRoutes.post("/logout", logOutController);
// console.log("AuthRoutes.js => auth.route.js called")
// authRoutes.get(
//     "/google",
//     passport.authenticate(
//         "google", {
//         scope: ["profile", "email"],
//     })
// );
// console.log("AuthRoutes.js => auth.route.js finished")
// authRoutes.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         failureRedirect: failedUrl,
//     }),
//     googleLoginCallback
// )
export default authRoutes