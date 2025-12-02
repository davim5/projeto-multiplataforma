import express from "express";
import {
    createPet,
    getPets,
    getPetById,
    updatePet,
    deletePet,
    getPetsByUser
} from "../controllers/petController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/pets/", getPets);
// router.get("/pets/:id", getPetById);
router.put("/pets/:id", updatePet);
router.delete("/pets/:id", deletePet);
router.post("/pets/",authMiddleware, createPet);
router.get("/pets/:id", authMiddleware, getPetsByUser);

export default router;
