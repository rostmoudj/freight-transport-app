import React, { useEffect, useState } from 'react';
import { Shipment } from '../../types/shipment';
import { fetchShipments } from '../../services/shipmentService';
import './ShipmentList.css'; // Assuming you have some styles for the ShipmentList

const ShipmentList: React.FC = () => {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);

    useEffect(() => {
        const loadShipments = async () => {
            try {
                const data = await fetchShipments();
                setShipments(data);
            } catch (err) {
                setError('Failed to load shipments');
            } finally {
                setLoading(false);
            }
        };

        loadShipments();
    }, []);

    const indexOfLastShipment = currentPage * itemsPerPage;
    const indexOfFirstShipment = indexOfLastShipment - itemsPerPage;
    const currentShipments = shipments.slice(indexOfFirstShipment, indexOfLastShipment);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="shipment-list">
            <h2>Recent Shipments</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentShipments.map((shipment) => (
                        <tr key={shipment.id}>
                            <td>{shipment.id}</td>
                            <td>{shipment.origin}</td>
                            <td>{shipment.destination}</td>
                            <td>{shipment.status}</td>
                            <td>{new Date(shipment.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: Math.ceil(shipments.length / itemsPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShipmentList;