import mongoose, { Schema, Document } from 'mongoose';

// Sub-schemas
const GPSPointSchema = new Schema({
    timestamp: { type: Number, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    alt: { type: Number, required: true },
    speed: { type: Number, required: true },
    sats: { type: Number, required: true },
    heading: { type: Number, required: true },
}, { _id: false });

const LapSchema = new Schema({
    lapNumber: { type: Number, required: true },
    time: { type: Number, required: true }, // ms
    sectors: { type: [Number], default: [] },
    maxSpeed: { type: Number }, // km/h
    avgSpeed: { type: Number }, // km/h
    valid: { type: Boolean, default: true },
}, { _id: false });

const DragRunSchema = new Schema({
    time0to60: { type: Number },
    time0to100: { type: Number },
    time100to200: { type: Number },
    time402m: { type: Number },
    trapSpeed402m: { type: Number },
    peakSpeed: { type: Number },
    slope: { type: Number },
    valid: { type: Boolean, default: true },
    graphSpeed: [{ t: Number, v: Number }],
    graphDist: [{ t: Number, d: Number }],
}, { _id: false });

// Main Session Schema
const SessionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    filename: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: ['TRACK', 'DRAG'], required: true },
    laps: { type: [LapSchema], default: [] },
    dragRun: { type: DragRunSchema },
    gpsPoints: { type: [GPSPointSchema], set: (v: any[]) => v }, // Allow large arrays
    createdAt: { type: Date, default: Date.now },
});

// Create compound index for efficient querying by user and date
SessionSchema.index({ userId: 1, date: -1 });

// Prevent over-compilation
const Session = mongoose.models.Session || mongoose.model('Session', SessionSchema);

export default Session;
