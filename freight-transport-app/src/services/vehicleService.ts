import { api } from './api';
import { Vehicle } from '../types/vehicle';

export const getVehicles = async (): Promise<Vehicle[]> => {
    const response = await api.get('/vehicles');
    return response.data;
};

export const getVehicleById = async (id: string): Promise<Vehicle> => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
};

export const createVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
    const response = await api.post('/vehicles', vehicle);
    return response.data;
};

export const updateVehicle = async (id: string, vehicle: Vehicle): Promise<Vehicle> => {
    const response = await api.put(`/vehicles/${id}`, vehicle);
    return response.data;
};

export const deleteVehicle = async (id: string): Promise<void> => {
    await api.delete(`/vehicles/${id}`);
};