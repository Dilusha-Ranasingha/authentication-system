import express from "express";
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/auth.controller.js';   //Imports the signup function from the auth.controller.js file.
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/signup', signup );                          // api/auth prifixes is signup


router.post('/login', login );                           // api/auth prifixes is login


router.post('/logout',logout );                          // api/auth prifixes is logout


router.post('/verifyemail',verifyEmail );                // api/auth prifixes is verify-email


router.post('/forgotpassword',forgotPassword );          // api/auth prifixes is forgot-password


router.post('/reset-password/:token',resetPassword );          // api/auth prifixes is reset-password


router.get("/checkauth", verifyToken, checkAuth);        // api/auth prifixes is check-auth

export default router;