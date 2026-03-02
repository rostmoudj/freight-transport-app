export interface Shipment {
    id: string;
    origin: string;
    destination: string;
    weight: number;
    status: ShipmentStatus;
    createdAt: Date;
    updatedAt: Date;
}

export enum ShipmentStatus {
    PENDING = 'Pending',
    IN_TRANSIT = 'In Transit',
    DELIVERED = 'Delivered',
    CANCELLED = 'Cancelled',
}