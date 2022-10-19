import express from "express";
import {
  userAvatar,
  userBaseInfo,
  changePwd,
  getOtherUser,
} from "../controllers/userSetting.js";
const router = express.Router();
router.get("/getOtherUser", getOtherUser);
router.post("/avatar", userAvatar);
router.post("/baseInfo", userBaseInfo);
router.post("/changePwd", changePwd);
export default router;
