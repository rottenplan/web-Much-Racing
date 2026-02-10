'use client';

import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix Leaflet Icon
const icon = L.icon({
    iconUrl: '/images/marker-icon.png',
    iconRetinaUrl: '/images/marker-icon-2x.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
// Note: In real app, need to serve these images or import from leaflet/dist/images

interface TrackMapProps {
    points: { lat: number; lon: number; speed?: number }[];
}

export default function TrackMap({ points }: TrackMapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div style={{ height: 400, width: '100%', backgroundColor: '#222' }}>Loading Map...</div>;

    if (!points || points.length === 0) return <div>No GPS Data</div>;

    const polyline: LatLngExpression[] = points.map(p => [p.lat, p.lon]);
    const startPoint = polyline[0];

    return (
        <MapContainer
            center={startPoint}
            zoom={16}
            style={{ height: '400px', width: '100%', borderRadius: 'var(--radius)' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* 
        In a real racing app, we would color this line based on speed 
        using multiple Polylines or a Canvas layer for performance.
        For MVP, a single blue line is fine.
      */}
            <Polyline positions={polyline} pathOptions={{ color: 'var(--primary)', weight: 4 }} />

            <Marker position={startPoint}><Popup>Start/Finish</Popup></Marker>
        </MapContainer>
    );
}
