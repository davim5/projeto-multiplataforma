import mongoose from "mongoose";

const WalkSchema = new mongoose.Schema({
    pet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    walker_id: { type: mongoose.Schema.Types.ObjectId, ref: "Walker", required: true },
    day: { type: Date, required: true },
    start_time: { type: String, required: true },
    duration: { type: Number, required: true },
    status: { 
        type: String,
        enum: ["pendente", "confirmado", "recusado", "concluido", "cancelado"],
        default: "pendente"
    },
    obs: { type: String },
    owner_rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

export default mongoose.model("Walk", WalkSchema);
