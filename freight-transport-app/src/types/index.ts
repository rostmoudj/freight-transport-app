export type Shipment = {
    id: string;
    origin: string;
    destination: string;
    status: 'pending' | 'in-transit' | 'delivered' | 'canceled';
    createdAt: Date;
    updatedAt: Date;
};

export type Vehicle = {
    id: string;
    model: string;
    licensePlate: string;
    status: 'available' | 'in-use' | 'maintenance';
    driverId?: string;
};

export type Driver = {
    id: string;
    name: string;
    licenseNumber: string;
    status: 'active' | 'inactive' | 'on-leave';
    vehicleId?: string;
};