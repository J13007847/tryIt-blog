import express from "express";
import {
  postList,
  postDetail,
  addPost,
  editPost,
  deletePost,
  getPostType,
  getPostGroup,
} from "../controllers/post.js";
const router = express.Router();
router.get("/", postList);
router.get("/postDetail", postDetail);
router.post("/addPost", addPost);
router.post("/editPost", editPost);
router.delete("/deletePost", deletePost);
router.get("/getPostType", getPostType);
router.get("/getPostGroup", getPostGroup);
export default router;
