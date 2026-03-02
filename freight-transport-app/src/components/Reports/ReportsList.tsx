import React from 'react';

const ReportsList: React.FC = () => {
    const reports = [
        { id: 1, title: 'Monthly Revenue Report', date: '2023-10-01', status: 'Generated' },
        { id: 2, title: 'Shipment Performance Report', date: '2023-10-05', status: 'Generated' },
        { id: 3, title: 'Driver Performance Report', date: '2023-10-10', status: 'Pending' },
    ];

    const handleExport = (reportId: number) => {
        // Logic to export the report
        console.log(`Exporting report with ID: ${reportId}`);
    };

    return (
        <div className="reports-list">
            <h2>Generated Reports</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.id}>
                            <td>{report.title}</td>
                            <td>{report.date}</td>
                            <td>{report.status}</td>
                            <td>
                                <button onClick={() => handleExport(report.id)}>Export</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsList;