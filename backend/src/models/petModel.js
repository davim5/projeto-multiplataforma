import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    race: { type: String },
    age: { type: Number },
    size: { type: String, enum: ["pequeno", "medio", "grande"], required: true },
    obs: { type: String },
    tutor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Pet", PetSchema);
