import Pet from "../models/petModel.js";

export const createPet = async (req, res) => {
  try {
    const tutorId = req.user.id; // ← pegando do token!

    const pet = await Pet.create({
      ...req.body,
      tutor_id: tutorId, // ← preenchido automaticamente
    });

    return res.json(pet);
  } catch (err) {
    return res.status(400).json({ error: err.message });
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

export const getPetsByUser = async (req, res) => {
    try {
        // ID do usuário logado vindo do token
        const tutorId = req.user.id;

        const pets = await Pet.find({ tutor_id: tutorId });

        return res.json(pets);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};