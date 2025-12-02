import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../index.js";

// CREATE
export const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, type } = req.body;

        // Verifica se o e-mail já existe
        const userExists = await Users.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Email já está em uso." });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário
        const user = await Users.create({
            name,
            email,
            password: hashedPassword,
            phone,
            type
        });

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                type: user.type
            }
        });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// READ ALL
export const getUsers = async (req, res) => {
    try {
        const filters = {};

        // Se vier ?type=passeador, será usado como filtro
        if (req.query.type) {
            filters.type = req.query.type;
        }

        if (req.query.name) {
            filters.name = { $regex: req.query.name, $options: "i" };
        }

        const users = await Users.find(filters);
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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: "Senha incorreta" });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: "JWT_SECRET não configurado" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login realizado com sucesso",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// GET /api/users?type=passeador
export const getUsersByType = async (req, res) => {
    try {
        const typeFilter = req.query.type ? { type: req.query.type } : {};

        const users = await Users.find(typeFilter);
        return res.json(users);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
