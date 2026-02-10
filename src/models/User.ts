import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false, // Don't return password by default
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    settings: {
        theme: { type: String, default: 'dark' },
        unitSystem: { type: String, enum: ['metric', 'imperial'], default: 'metric' }
    }
});

// Prevention of model overwriting
export default mongoose.models.User || mongoose.model('User', UserSchema);
