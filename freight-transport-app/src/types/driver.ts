export type DriverStatus = 'available' | 'in-trip' | 'on-leave' | 'suspended';

export type DriverTripRecord = {
    tripId: string;
    date: string;
    route: string;
    rating: number;
    status: 'completed' | 'in-transit' | 'canceled';
};

export type DriverDocument = {
    id: string;
    label: string;
    expiryDate: string;
    status: 'valid' | 'expiring' | 'expired';
};

export interface Driver {
    id: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    licenseNumber: string;
    licenseExpiryDate: string;
    status: DriverStatus;
    rating: number;
    completedTripsCount: number;
    salary: number;
    commission: number;
    avatarUrl?: string;
}

export interface DriverProfile extends Driver {
    trips: DriverTripRecord[];
    documents: DriverDocument[];
}