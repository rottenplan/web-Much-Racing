'use client';

import SpeedChart from "@/components/charts/SpeedChart";

// Mock Data
const mockRun = {
    date: "Oct 22, 2025 23:45",
    time0to100: 4200, // ms
    time402m: 12400, // ms
    trapSpeed: 185.5, // km/h
    slope: 0.5, // %
    graphData: Array.from({ length: 100 }, (_, i) => ({
        t: i * 124, // 12.4s total
        v: Math.min(185, i * 2), // Linear accel mock
    })),
};

export default function DragMeterPage() {
    return (
        <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--primary)" }}>Drag Meter Analysis</h1>

            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ padding: "1.5rem", borderRadius: "var(--radius)", backgroundColor: "var(--secondary)", border: "1px solid var(--border)" }}>
                    <h3 style={{ color: "var(--muted-foreground)", margin: 0 }}>0-100 km/h</h3>
                    <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0", color: "var(--accent)" }}>
                        {(mockRun.time0to100 / 1000).toFixed(2)}s
                    </p>
                </div>
                <div style={{ padding: "1.5rem", borderRadius: "var(--radius)", backgroundColor: "var(--secondary)", border: "1px solid var(--border)" }}>
                    <h3 style={{ color: "var(--muted-foreground)", margin: 0 }}>1/4 Mile</h3>
                    <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0", color: "var(--primary)" }}>
                        {(mockRun.time402m / 1000).toFixed(2)}s
                    </p>
                    <span style={{ color: "var(--muted-foreground)" }}>@ {mockRun.trapSpeed} km/h</span>
                </div>
                <div style={{ padding: "1.5rem", borderRadius: "var(--radius)", backgroundColor: "var(--secondary)", border: "1px solid var(--border)" }}>
                    <h3 style={{ color: "var(--muted-foreground)", margin: 0 }}>Slope</h3>
                    <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0", color: mockRun.slope > 1 ? "red" : "green" }}>
                        {mockRun.slope}%
                    </p>
                    <span style={{ color: "var(--muted-foreground)" }}>{mockRun.slope <= 1 ? "Valid" : "Invalid"}</span>
                </div>
            </div>

            {/* Graph */}
            <h2 style={{ marginBottom: "1rem" }}>Speed Trace</h2>
            <SpeedChart data={mockRun.graphData} />
        </div>
    );
}
