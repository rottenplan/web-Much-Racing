export default function SettingsPage() {
    return (
        <div>
            <h1 style={{ fontSize: "2rem", marginBottom: "2rem", color: "var(--primary)" }}>Settings</h1>

            <div style={{ maxWidth: "600px", display: "flex", flexDirection: "column", gap: "2rem" }}>

                {/* Profile Section */}
                <section style={{ backgroundColor: "var(--secondary)", padding: "1.5rem", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                    <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.25rem" }}>Profile</h2>
                    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--muted-foreground)" }}>Username</label>
                            <input
                                type="text"
                                value="RacerOne"
                                readOnly
                                style={{ width: "100%", padding: "0.5rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", backgroundColor: "var(--input)", color: "white" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--muted-foreground)" }}>Email</label>
                            <input
                                type="email"
                                value="racer@muchracing.com"
                                readOnly
                                style={{ width: "100%", padding: "0.5rem", borderRadius: "var(--radius)", border: "1px solid var(--border)", backgroundColor: "var(--input)", color: "white" }}
                            />
                        </div>
                    </div>
                </section>

                {/* Units Section */}
                <section style={{ backgroundColor: "var(--secondary)", padding: "1.5rem", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                    <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.25rem" }}>Preferences</h2>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span>Speed Units</span>
                        <select style={{ padding: "0.5rem", borderRadius: "var(--radius)", backgroundColor: "var(--input)", color: "white", border: "1px solid var(--border)" }}>
                            <option>KM/H</option>
                            <option>MPH</option>
                        </select>
                    </div>
                </section>

                {/* Device Section */}
                <section style={{ backgroundColor: "var(--secondary)", padding: "1.5rem", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                    <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.25rem" }}>Device Status</h2>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ color: "var(--muted-foreground)" }}>Last Sync</span>
                        <span>Just now</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "var(--muted-foreground)" }}>Firmware</span>
                        <span>v1.2.0</span>
                    </div>
                </section>

            </div>
        </div>
    );
}
