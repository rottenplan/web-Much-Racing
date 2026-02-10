export interface Session {
    id: string; // UUID from database or generated
    filename: string; // Original filename from device
    date: string; // ISO String
    type: 'TRACK' | 'DRAG';
    laps?: Lap[];
    dragRun?: DragRun;
    gpsPoints?: GPSPoint[];
}

export interface GPSPoint {
    timestamp: number; // ms from start
    lat: number;
    lon: number;
    alt: number;
    speed: number; // km/h
    sats: number;
    heading: number;
}

export interface Lap {
    lapNumber: number;
    time: number; // ms
    sectors: number[]; // Sector times in ms
    maxSpeed: number; // km/h
    avgSpeed: number; // km/h
    valid: boolean;
}

export interface DragRun {
    time0to60: number; // ms
    time0to100: number; // ms
    time100to200: number; // ms
    time402m: number; // ms
    trapSpeed402m: number; // km/h
    peakSpeed: number; // km/h
    slope: number; // percentage
    valid: boolean;
    graphSpeed: { t: number; v: number }[]; // For simple graph rendering
    graphDist: { t: number; d: number }[];
}

export interface DeviceStatus {
    lastSync: string;
    firmwareVersion: string;
    batteryLevel: number;
    storageUsage: number; // GB used
}
