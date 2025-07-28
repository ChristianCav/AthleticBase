import mongoose, { mongo } from "mongoose";

const performanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["Soccer", "Golf", "Run", "Workout"],
        required: true
    },
    title: {
        type: String,
        default: "Untitled Performance"
    },
    duration: {
        type: Number,
        default: 0,
    },
    location: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    starred: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Performance = mongoose.model("Performance", performanceSchema);

export default Performance;
