import Walk from "../models/walkModel.js";

// CREATE
export const createWalk = async (req, res) => {
  try {
    const owner_id = req.user.id; // vindo do authMiddleware
    const { pet_id, walker_id, day, start_time, duration, obs } = req.body;

    const walk = await Walk.create({
      pet_id,
      owner_id,
      walker_id,
      day,
      start_time,
      duration,
      obs,
    });

    return res.status(201).json(walk);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// GET ALL WALKS OF LOGGED USER
export const getWalksByUser = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const walks = await Walk.find({ owner_id })
      .populate("pet_id")
      .populate("walker_id");
    res.json(walks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET WALKS OF SPECIFIC WALKER
export const getWalksByWalker = async (req, res) => {
  try {
    const walker_id = req.user.id;
    const walks = await Walk.find({ walker_id })
      .populate("pet_id")
      .populate("owner_id");
    res.json(walks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE STATUS / OWNER RATING
export const updateWalk = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const walk = await Walk.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!walk) return res.status(404).json({ error: "Walk not found" });

    res.json(walk);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE WALK
export const deleteWalk = async (req, res) => {
  try {
    const { id } = req.params;
    const walk = await Walk.findByIdAndDelete(id);
    if (!walk) return res.status(404).json({ error: "Walk not found" });
    res.json({ message: "Walk deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWalkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const walk = await Walk.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!walk) {
      return res.status(404).json({ error: "Walk not found" });
    }

    res.json(walk);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating status" });
  }
};
