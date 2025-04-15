import express from "express";
import {
  reportItem,
  getItems,
  getUserItems,
} from "../controllers/itemController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/report", auth, reportItem);
router.get("/", getItems);
router.get("/user/:userId", auth, getUserItems);

export default router;
