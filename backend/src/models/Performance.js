import mongoose, { mongo } from "mongoose";

const performanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["soccer", "golf", "run", "workout"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, {timestamps: true});

const Performance = mongoose.model("Performance", performanceSchema);

export default Performance;
