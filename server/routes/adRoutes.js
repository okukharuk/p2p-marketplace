import express from "express";
import { create, get, list, remove, update } from "../controllers/adController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("*", authorize, protect);

router.get("/get", authorize, get);
router.get("/list", list);

router.post("/create", create);
router.post("/update", update);
router.post("/delete", remove);

export default router;
