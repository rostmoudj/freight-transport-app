import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Vehicle } from '../../types/vehicle';
import { vehicleService } from '../../services/vehicleService';

const VehicleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: vehicle, loading, error } = useFetch<Vehicle>(() => vehicleService.getVehicleById(id), [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading vehicle details.</div>;

    return (
        <div>
            <h1>Vehicle Detail</h1>
            <h2>{vehicle.name}</h2>
            <p><strong>Type:</strong> {vehicle.type}</p>
            <p><strong>Status:</strong> {vehicle.status}</p>
            <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>
            <p><strong>Capacity:</strong> {vehicle.capacity} tons</p>
            <p><strong>Last Maintenance:</strong> {vehicle.lastMaintenance}</p>
            <p><strong>Assigned Driver:</strong> {vehicle.assignedDriver}</p>
        </div>
    );
};

export default VehicleDetail;