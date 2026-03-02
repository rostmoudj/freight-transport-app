export type TripStatus = 'scheduled' | 'in-transit' | 'completed' | 'canceled' | 'delayed';

export type FleetStatus = 'available' | 'in-trip' | 'maintenance' | 'out-of-service';

export type DriverAvailability = 'available' | 'in-trip' | 'on-leave' | 'suspended';

export type Trip = {
    id: string;
    date: string;
    expectedDateTime: string;
    client: string;
    driver: string;
    vehicle: string;
    origin: string;
    destination: string;
    cargoType: string;
    weightTons: number;
    status: TripStatus;
    cost: number;
    notes?: string;
};

export type DriverOption = {
    id: string;
    name: string;
    status: DriverAvailability;
};

export type VehicleOption = {
    id: string;
    plate: string;
    status: FleetStatus;
};

export type ClientOption = {
    id: string;
    name: string;
};

export type TripFilters = {
    search: string;
    date: string;
    status: TripStatus | 'all';
    driver: string;
    vehicle: string;
};