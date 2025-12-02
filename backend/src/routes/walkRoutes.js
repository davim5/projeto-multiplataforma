import express from "express";
import {
    createWalk,
    getWalksByUser,
    getWalksByWalker,
    updateWalk,
    deleteWalk
} from "../controllers/walkController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();
router.use(authMiddleware);

// Criar novo passeio
router.post("/walk", createWalk);
router.get("/walk", getWalksByUser);
router.get("/walker", getWalksByWalker);
router.put("/:id", updateWalk);
router.delete("/:id", deleteWalk);

export default router;
