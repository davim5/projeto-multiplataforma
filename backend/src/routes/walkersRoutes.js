import express from "express";
import {
    createWalker,
    getWalkers,
    getWalkerById,
    updateWalker,
    deleteWalker
} from "../controllers/walkerController.js";

const router = express.Router();

router.post("/walkers/", createWalker);
router.get("/walkers/", getWalkers);
router.get("/walkers/:id", getWalkerById);
router.put("/walkers/:id", updateWalker);
router.delete("/walkers/:id", deleteWalker);

export default router;