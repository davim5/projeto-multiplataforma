import express from "express";
import {
    createWalk,
    getWalks,
    getWalkById,
    updateWalk,
    deleteWalk
} from "../controllers/walkController.js";

const router = express.Router();

router.post("/walk/", createWalk);
router.get("/walk/", getWalks);
router.get("/walk/:id", getWalkById);
router.put("/walk/:id", updateWalk);
router.delete("/walk/:id", deleteWalk);

export default router;
