export type ClientCategory = 'standard' | 'vip' | 'enterprise';

export type ClientTripRecord = {
    tripId: string;
    date: string;
    route: string;
    amount: number;
    status: 'completed' | 'in-transit' | 'canceled';
};

export interface Client {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    category: ClientCategory;
    totalPaid: number;
    totalOutstanding: number;
    notes?: string;
}

export interface ClientProfile extends Client {
    trips: ClientTripRecord[];
}
