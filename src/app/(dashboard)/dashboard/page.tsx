export default function DashboardPage() {
    return (
        <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--primary)" }}>Dashboard</h1>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                {/* Stat Cards */}
                <div style={{ padding: "1.5rem", borderRadius: "var(--radius)", backgroundColor: "var(--secondary)", border: "1px solid var(--border)" }}>
                    <h3 style={{ margin: 0, color: "var(--muted-foreground)" }}>Total Sessions</h3>
                    <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0.5rem 0" }}>12</p>
                </div>

                <div style={{ padding: "1.5rem", borderRadius: "var(--radius)", backgroundColor: "var(--secondary)", border: "1px solid var(--border)" }}>
                    <h3 style={{ margin: 0, color: "var(--muted-foreground)" }}>Best Lap</h3>
                    <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0.5rem 0" }}>1:24.53</p>
                    <span style={{ color: "var(--primary)", fontSize: "0.875rem" }}>Sentul International</span>
                </div>

                <div style={{ padding: "1.5rem", borderRadius: "var(--radius)", backgroundColor: "var(--secondary)", border: "1px solid var(--border)" }}>
                    <h3 style={{ margin: 0, color: "var(--muted-foreground)" }}>Best 0-100</h3>
                    <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0.5rem 0" }}>4.2s</p>
                </div>
            </div>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Recent Activity</h2>
            <div style={{ borderRadius: "var(--radius)", backgroundColor: "var(--secondary)", border: "1px solid var(--border)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid var(--border)" }}>
                            <th style={{ padding: "1rem" }}>Date</th>
                            <th style={{ padding: "1rem" }}>Track / Run</th>
                            <th style={{ padding: "1rem" }}>Type</th>
                            <th style={{ padding: "1rem" }}>Best Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Oct 24, 2025</td>
                            <td style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>Sentul Setup Test</td>
                            <td style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>TRACK</td>
                            <td style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>1:26.3</td>
                        </tr>
                        <tr>
                            <td style={{ padding: "1rem" }}>Oct 22, 2025</td>
                            <td style={{ padding: "1rem" }}>Midnight Drag</td>
                            <td style={{ padding: "1rem" }}>DRAG</td>
                            <td style={{ padding: "1rem" }}>4.5s (0-100)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
