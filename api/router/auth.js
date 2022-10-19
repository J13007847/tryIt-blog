import express from "express";
import { login, register, loginOut } from "../controllers/auth.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/loginOut", loginOut);
export default router;
