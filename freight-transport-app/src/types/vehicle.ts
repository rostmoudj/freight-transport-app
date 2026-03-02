export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    status: 'active' | 'inactive' | 'maintenance';
    capacity: number; // in tons
    currentLocation: string;
    lastServiceDate: Date;
}