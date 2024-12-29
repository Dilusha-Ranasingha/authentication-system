import express from "express";
import { signup, login, logout, verifyEmail, forgotPassword } from '../controllers/auth.controller.js';   //Imports the signup function from the auth.controller.js file.

const router = express.Router();

router.post('/signup', signup );                          // api/auth prifixes is signup


router.post('/login', login );                           // api/auth prifixes is login


router.post('/logout',logout );                          // api/auth prifixes is logout


router.post('/verify-email',verifyEmail );                // api/auth prifixes is verify-email


router.post('/forgot-password',forgotPassword );          // api/auth prifixes is forgot-password

export default router;