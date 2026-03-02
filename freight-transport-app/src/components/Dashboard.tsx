import React from 'react';
import { useEffect, useState } from 'react';
import { fetchStatistics } from '../services/api'; // Assuming this function fetches the required statistics

const Dashboard: React.FC = () => {
    const [statistics, setStatistics] = useState({
        totalTrips: 0,
        completedTrips: 0,
        monthlyRevenue: 0,
        vehiclesInMaintenance: 0,
    });

    useEffect(() => {
        const getStatistics = async () => {
            try {
                const data = await fetchStatistics();
                setStatistics(data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        getStatistics();
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="statistics">
                <div className="statistic">
                    <h2>Total Trips</h2>
                    <p>{statistics.totalTrips}</p>
                </div>
                <div className="statistic">
                    <h2>Completed Trips</h2>
                    <p>{statistics.completedTrips}</p>
                </div>
                <div className="statistic">
                    <h2>Monthly Revenue</h2>
                    <p>${statistics.monthlyRevenue.toFixed(2)}</p>
                </div>
                <div className="statistic">
                    <h2>Vehicles in Maintenance</h2>
                    <p>{statistics.vehiclesInMaintenance}</p>
                </div>
            </div>
            {/* Additional charts and graphs can be added here */}
        </div>
    );
};

export default Dashboard;