import express from "express";
import { signup, login, logout } from '../controllers/auth.controller.js';   //Imports the signup function from the auth.controller.js file.

const router = express.Router();

router.get('/signup', signup );                          // api/auth prifixes is signup


router.get('/login', login );                           // api/auth prifixes is login


router.get('/logout',logout );                          // api/auth prifixes is logout


export default router;