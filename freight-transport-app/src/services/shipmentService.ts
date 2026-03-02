import { Shipment } from '../types/shipment';
import { api } from './api';

export const getShipments = async (): Promise<Shipment[]> => {
    const response = await api.get('/shipments');
    return response.data;
};

export const getShipmentById = async (id: string): Promise<Shipment> => {
    const response = await api.get(`/shipments/${id}`);
    return response.data;
};

export const createShipment = async (shipment: Shipment): Promise<Shipment> => {
    const response = await api.post('/shipments', shipment);
    return response.data;
};

export const updateShipment = async (id: string, shipment: Shipment): Promise<Shipment> => {
    const response = await api.put(`/shipments/${id}`, shipment);
    return response.data;
};

export const deleteShipment = async (id: string): Promise<void> => {
    await api.delete(`/shipments/${id}`);
};