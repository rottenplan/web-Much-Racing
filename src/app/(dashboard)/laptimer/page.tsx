'use client';

import dynamic from 'next/dynamic';
import SpeedChart from "@/components/charts/SpeedChart";

// Dynamic import for Map to avoid SSR issues
const TrackMap = dynamic(() => import('@/components/maps/TrackMap'), {
    ssr: false,
    loading: () => <div style={{ height: 400, background: '#222' }}>Loading Map module...</div>
});

// Mock Data
const mockSession = {
    date: "Oct 24, 2025",
    track: "Sentul International Circuit",
    bestLap: 86300, // 1:26.3
    laps: [
        { lap: 1, time: 92400, valid: true, maxSpeed: 145 },
        { lap: 2, time: 88200, valid: true, maxSpeed: 152 },
        { lap: 3, time: 86300, valid: true, maxSpeed: 155 }, // Best
        { lap: 4, time: 87100, valid: true, maxSpeed: 154 },
        { lap: 5, time: 94000, valid: false, maxSpeed: 120 }, // In lap/Invalid
    ],
    gpsData: [
        { lat: -6.5358, lon: 106.8587 }, // Sentul-ish coords
        { lat: -6.5360, lon: 106.8590 },
        { lat: -6.5370, lon: 106.8600 },
        { lat: -6.5380, lon: 106.8580 },
        { lat: -6.5358, lon: 106.8587 }, // Loop
    ],
    telemetry: Array.from({ length: 100 }, (_, i) => ({
        t: i * 863, // 86.3s total
        v: 50 + Math.sin(i / 10) * 100, // Mock speed wave
        rpm: 4000 + Math.sin(i / 10) * 4000,
    })),
};

function formatTime(ms: number) {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const milli = Math.floor((ms % 1000) / 10);
    return `${min}:${sec.toString().padStart(2, '0')}.${milli.toString().padStart(2, '0')}`;
}

export default function LapTimerPage() {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                    <h1 style={{ fontSize: "2rem", color: "var(--primary)", margin: 0 }}>{mockSession.track}</h1>
                    <span style={{ color: "var(--muted-foreground)" }}>{mockSession.date}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                    <h3 style={{ margin: 0, color: "var(--muted-foreground)" }}>Best Lap</h3>
                    <span style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--accent)" }}>
                        {formatTime(mockSession.bestLap)}
                    </span>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "1rem", marginBottom: "2rem" }}>
                {/* Map Section */}
                <div style={{ borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid var(--border)" }}>
                    <TrackMap points={mockSession.gpsData} />
                </div>

                {/* Lap Table */}
                <div style={{ borderRadius: "var(--radius)", backgroundColor: "var(--secondary)", border: "1px solid var(--border)", overflowY: "auto", maxHeight: "400px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                        <thead style={{ position: "sticky", top: 0, backgroundColor: "var(--secondary)" }}>
                            <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left" }}>
                                <th style={{ padding: "0.75rem" }}>#</th>
                                <th style={{ padding: "0.75rem" }}>Time</th>
                                <th style={{ padding: "0.75rem" }}>Max KPH</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockSession.laps.map((lap) => (
                                <tr key={lap.lap} style={{
                                    borderBottom: "1px solid var(--border)",
                                    backgroundColor: lap.time === mockSession.bestLap ? "rgba(4, 223, 208, 0.1)" : "transparent",
                                    color: lap.valid ? "inherit" : "var(--muted-foreground)"
                                }}>
                                    <td style={{ padding: "0.75rem" }}>{lap.lap}</td>
                                    <td style={{ padding: "0.75rem", fontWeight: lap.time === mockSession.bestLap ? "bold" : "normal" }}>
                                        {formatTime(lap.time)}
                                    </td>
                                    <td style={{ padding: "0.75rem" }}>{lap.maxSpeed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <h2 style={{ marginBottom: "1rem" }}>Telemetry (Best Lap)</h2>
            <SpeedChart data={mockSession.telemetry} showRpm={true} />
        </div>
    );
}
