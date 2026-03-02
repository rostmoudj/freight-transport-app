import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Shipment } from '../../types/shipment';

const ShipmentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: shipment, loading, error } = useFetch<Shipment>(`/api/shipments/${id}`);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading shipment details.</div>;

    return (
        <div>
            <h2>Shipment Details</h2>
            <p><strong>ID:</strong> {shipment.id}</p>
            <p><strong>Origin:</strong> {shipment.origin}</p>
            <p><strong>Destination:</strong> {shipment.destination}</p>
            <p><strong>Status:</strong> {shipment.status}</p>
            <p><strong>Estimated Delivery:</strong> {shipment.estimatedDelivery}</p>
            <p><strong>Description:</strong> {shipment.description}</p>
        </div>
    );
};

export default ShipmentDetail;