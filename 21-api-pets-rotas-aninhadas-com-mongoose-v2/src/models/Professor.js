import mongoose from 'mongoose';

const Class = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Campo 'name' é obrigatório"]
    },
    description: {
        type: String,
        required: [true, "Campo 'description' é obrigatório"]
    }    
}, {
    timestamps: true
});

const Professor = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "O campo 'name' é obrigatório"]
    },
    sex: {
        type: String,
        required: [true, "Campo 'sex' é obrigatório"],
        enum: ['M', 'F'],
        uppercase: true
    },
    Classes: [Class]
}, {
    timestamps: true
});

export default mongoose.model("Professor", Professor);