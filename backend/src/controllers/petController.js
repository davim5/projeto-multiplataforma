import Pet from "../models/petModel.js";

export const createPet = async (req, res) => {
    try {
        const newPet = await Pet.create(req.body);
        res.status(201).json(newPet);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const getPets = async (req, res) => {
    res.json(await Pet.find().populate("tutor_id"));
};

export const getPetById = async (req, res) => {
    const pet = await Pet.findById(req.params.id).populate("tutor_id");
    pet ? res.json(pet) : res.status(404).json({ error: "Pet not found" });
};

export const updatePet = async (req, res) => {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    pet ? res.json(pet) : res.status(404).json({ error: "Pet not found" });
};

export const deletePet = async (req, res) => {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    pet
        ? res.json({ message: "Pet deleted" })
        : res.status(404).json({ error: "Pet not found" });
};
