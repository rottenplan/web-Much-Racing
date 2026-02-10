import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate basic structure (SessionManager format)
        if (!body || !body.username || !body.data) {
            return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
        }

        console.log("Received Sync Data from:", body.username);
        console.log("Session Type:", body.type);

        // In a real app, save to database here
        // For now, we just acknowledge

        return NextResponse.json({ success: true, message: "Sync successful" });

    } catch (error) {
        console.error("Sync Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
