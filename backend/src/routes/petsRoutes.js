import express from "express";
import {
    createPet,
    getPets,
    getPetById,
    updatePet,
    deletePet
} from "../controllers/petController.js";

const router = express.Router();

router.post("/pets/", createPet);
router.get("/pets/", getPets);
router.get("/pets/:id", getPetById);
router.put("/pets/:id", updatePet);
router.delete("/pets/:id", deletePet);

export default router;
