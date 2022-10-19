import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { validateToken } from "./controllers/intercept.js";
import postRouter from "./router/post.js";
import authRouter from "./router/auth.js";
import userSettingRouter from "./router/userSetting.js";
import { upload, fileHandle } from "./controllers/uploadFile.js";
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(validateToken);
app.use("/api/post", postRouter);
app.use("/api/user", authRouter);
app.use("/api/userSetting", userSettingRouter);
app.use("/api/upload", upload.single("file"), fileHandle);
app.use("/", express.static(path.join(__dirname, "build")));
app.listen(8800, () => {
  console.log("服务已启动，地址为:127.0.0.1");
});
