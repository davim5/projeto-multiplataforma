import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "Token não informado" });
        }

        const [, token] = authHeader.split(" ");

        if (!token) {
            return res.status(401).json({ error: "Token inválido" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Anexa o usuário ao request (id, email)
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};
