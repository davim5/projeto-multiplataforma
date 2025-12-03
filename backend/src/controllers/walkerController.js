import Walker from "../models/walkerModel.js";

export const createWalker = async (req, res) => {
    try {
        const newWalker = await Walker.create(req.body);
        res.status(201).json(newWalker);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

export const getWalkers = async (req, res) => {
    res.json(await Walker.find().populate("user_id"));
};

export const getWalkerById = async (req, res) => {
    const walker = await Walker.findById(req.params.id).populate("user_id");
    walker
        ? res.json(walker)
        : res.status(404).json({ error: "Walker not found" });
};

export const updateWalker = async (req, res) => {
    const walker = await Walker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    walker
        ? res.json(walker)
        : res.status(404).json({ error: "Walker not found" });
};

export const deleteWalker = async (req, res) => {
    const walker = await Walker.findByIdAndDelete(req.params.id);
    walker
        ? res.json({ message: "Walker deleted" })
        : res.status(404).json({ error: "Walker not found" });
};
