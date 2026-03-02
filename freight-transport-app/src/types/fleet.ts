export type VehicleStatus = 'available' | 'in-trip' | 'maintenance' | 'out-of-service';

export type VehicleTripRecord = {
    tripId: string;
    date: string;
    origin: string;
    destination: string;
    driver: string;
    status: 'completed' | 'in-transit' | 'canceled';
    cost: number;
    kilometers: number;
};

export type MaintenanceRecord = {
    id: string;
    date: string;
    type: 'وقود' | 'صيانة دورية' | 'إصلاح طارئ' | 'إطارات' | 'زيوت';
    cost: number;
    description: string;
};

export type VehicleDocument = {
    id: string;
    label: string;
    expiryDate: string;
    status: 'valid' | 'expiring' | 'expired';
};

export type FleetVehicle = {
    id: string;
    plate: string;
    type: string;
    model: string;
    year: number;
    status: VehicleStatus;
    utilizationPercent: number;
    lastInspection: string;
    nextInspection: string;
    totalKilometers: number;
    imageUrl?: string;
};

export type FleetVehicleDetail = FleetVehicle & {
    trips: VehicleTripRecord[];
    maintenance: MaintenanceRecord[];
    documents: VehicleDocument[];
};
