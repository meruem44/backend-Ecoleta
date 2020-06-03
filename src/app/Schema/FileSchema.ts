import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('file', FileSchema);