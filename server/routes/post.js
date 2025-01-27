import express from "express";
import { getPosts, addPosts, getMysPosts, deletePost, editPost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/my-posts", getMysPosts);
router.post("/", addPosts);
router.delete("/:id", deletePost);
router.patch("/:id", editPost);

export default router;