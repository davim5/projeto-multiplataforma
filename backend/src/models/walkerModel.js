import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema({
    day: String,
    start: String,
    end: String
}, { _id: false });

const WalkerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    area: { type: String },
    rating: { type: Number, default: 0 },
    availability: [AvailabilitySchema]
}, { timestamps: true });

export default mongoose.model("Walker", WalkerSchema);