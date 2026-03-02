import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Driver } from '../../types/driver';

const DriverDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: driver, loading, error } = useFetch<Driver>(`/api/drivers/${id}`);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading driver details.</div>;

    return (
        <div>
            <h1>Driver Details</h1>
            <h2>{driver.name}</h2>
            <p><strong>ID:</strong> {driver.id}</p>
            <p><strong>Email:</strong> {driver.email}</p>
            <p><strong>Phone:</strong> {driver.phone}</p>
            <p><strong>Status:</strong> {driver.status}</p>
            <p><strong>Performance:</strong> {driver.performance}</p>
        </div>
    );
};

export default DriverDetail;