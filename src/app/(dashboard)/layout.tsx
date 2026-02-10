import Sidebar from "@/components/ui/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ marginLeft: "250px", flex: 1, padding: "2rem" }}>
                {children}
            </main>
        </div>
    );
}
