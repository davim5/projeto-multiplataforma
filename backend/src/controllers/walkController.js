import Walk from "../models/walkModel.js";

export const createWalk = async (req, res) => {
    try {
        const newWalk = await Walk.create(req.body);
        res.status(201).json(newWalk);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const getWalks = async (req, res) => {
    res.json(await Walk.find()
        .populate("pet_id")
        .populate("tutor_id")
        .populate("passeador_id")
    );
};

export const getWalkById = async (req, res) => {
    const walk = await Walk.findById(req.params.id)
        .populate("pet_id")
        .populate("tutor_id")
        .populate("passeador_id");

    walk
        ? res.json(walk)
        : res.status(404).json({ error: "Walk not found" });
};

export const updateWalk = async (req, res) => {
    const walk = await Walk.findByIdAndUpdate(req.params.id, req.body, { new: true });
    walk
        ? res.json(walk)
        : res.status(404).json({ error: "Walk not found" });
};

export const deleteWalk = async (req, res) => {
    const walk = await Walk.findByIdAndDelete(req.params.id);
    walk
        ? res.json({ message: "Walk deleted" })
        : res.status(404).json({ error: "Walk not found" });
};
