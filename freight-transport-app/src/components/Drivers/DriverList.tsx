import React, { useEffect, useState } from 'react';
import { Driver } from '../../types/driver';
import { fetchDrivers } from '../../services/driverService';

const DriverList: React.FC = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDrivers = async () => {
            try {
                const data = await fetchDrivers();
                setDrivers(data);
            } catch (err) {
                setError('Failed to load drivers');
            } finally {
                setLoading(false);
            }
        };

        loadDrivers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Driver List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Performance</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map(driver => (
                        <tr key={driver.id}>
                            <td>{driver.name}</td>
                            <td>{driver.status}</td>
                            <td>{driver.performance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DriverList;