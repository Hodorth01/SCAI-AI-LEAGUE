const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
    experience: {
        type: String,
        default: "Beginner" 
    },
    games: {
        type: Number,
        default: 0           
    },
    shots: {
        type: Number,
        default: 0          
    },
    accuracy: {
        type: Number,
        default: 0          
    },
    wins: {
        type: Number,
        default: 0          
    },
    heatmap: {
        type: String,
        default: ""
    },
    shot_placements: {
        type: String,
        default: ""          
    },
    Performance: {
        type: [Number],      
        default: []          
    }
}, {
    timestamps: true        
});

module.exports = mongoose.model("Status", StatusSchema);