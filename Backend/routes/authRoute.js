import express from "express";
import {
  loginController,
  registerController,
  storage,
} from "../controller/authController.js";
import multer from "multer";
import { requireSignIn } from "../middleware/authMiddleware.js";

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/register", upload.single("profileImage"), registerController);
router.post("/login", loginController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
