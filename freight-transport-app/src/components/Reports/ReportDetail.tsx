import React from 'react';

const ReportDetail: React.FC = () => {
    // Sample data for report detail
    const report = {
        id: '12345',
        title: 'Monthly Freight Report',
        date: '2023-10-01',
        totalShipments: 150,
        totalRevenue: 25000,
        details: [
            { shipmentId: '001', revenue: 200, status: 'Delivered' },
            { shipmentId: '002', revenue: 300, status: 'In Transit' },
            // Add more shipment details as needed
        ],
    };

    return (
        <div className="report-detail">
            <h2>{report.title}</h2>
            <p>Date: {report.date}</p>
            <p>Total Shipments: {report.totalShipments}</p>
            <p>Total Revenue: ${report.totalRevenue}</p>
            <h3>Shipment Details</h3>
            <ul>
                {report.details.map((shipment) => (
                    <li key={shipment.shipmentId}>
                        Shipment ID: {shipment.shipmentId}, Revenue: ${shipment.revenue}, Status: {shipment.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportDetail;