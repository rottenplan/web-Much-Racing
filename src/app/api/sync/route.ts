import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import Session from "@/models/Session";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Basic Validation
        if (!body || !body.username || !body.data) {
            return NextResponse.json({ success: false, error: "Invalid payload: Missing username or data" }, { status: 400 });
        }

        const { username, type, data } = body;

        await dbConnect();

        // 2. Find User
        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        // 3. Prevent Duplicates (Check by filename for this user)
        // Ideally we should use a unique session ID from the device, but filename is a good proxy for now
        const existingSession = await Session.findOne({ userId: user._id, filename: data.filename });
        if (existingSession) {
            return NextResponse.json({ success: true, message: "Session already exists", id: existingSession._id });
        }

        // 4. Create Session
        const newSession = new Session({
            userId: user._id,
            filename: data.filename,
            date: data.date ? new Date(data.date) : new Date(),
            type: type || 'TRACK', // Default to TRACK if not specified
            gpsPoints: data.gpsPoints || [],
            // Conditionals based on type
            ...(type === 'DRAG' ? { dragRun: data.dragRun } : { laps: data.laps || [] }),
        });

        await newSession.save();

        console.log(`Synced session ${data.filename} for user ${username}`);

        return NextResponse.json({ success: true, message: "Sync successful", id: newSession._id }, { status: 201 });

    } catch (error) {
        console.error("Sync Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
