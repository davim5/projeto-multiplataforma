import Users from "../models/userModel.js";

// CREATE
export const createUser = async (req, res) => {
    try {
        const user = await Users.create(req.body);
        return res.status(201).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// READ ALL
export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// READ BY ID
export const getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        return res.json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// UPDATE
export const updateUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        return res.json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// DELETE
export const deleteUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);

        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        return res.json({ message: "Usuário removido com sucesso" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
 