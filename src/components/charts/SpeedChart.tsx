'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SpeedChartProps {
    data: { t: number; v?: number; rpm?: number }[];
    showRpm?: boolean;
}

export default function SpeedChart({ data, showRpm = false }: SpeedChartProps) {
    return (
        <div style={{ width: '100%', height: 300, backgroundColor: 'var(--secondary)', borderRadius: 'var(--radius)', padding: '1rem' }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                        dataKey="t"
                        stroke="#888"
                        tickFormatter={(val) => (val / 1000).toFixed(1) + 's'}
                    />
                    <YAxis stroke="#888" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                        labelFormatter={(label) => `Time: ${(label / 1000).toFixed(2)}s`}
                    />
                    <Line
                        type="monotone"
                        dataKey="v"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        dot={false}
                        name="Speed (km/h)"
                    />
                    {showRpm && (
                        <Line
                            type="monotone"
                            dataKey="rpm"
                            stroke="var(--accent)"
                            strokeWidth={2}
                            dot={false}
                            name="RPM"
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
