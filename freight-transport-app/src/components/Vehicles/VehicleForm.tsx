import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createVehicle } from '../../../services/vehicleService';
import './VehicleForm.css';

const VehicleForm = () => {
    const [vehicleData, setVehicleData] = useState({
        name: '',
        type: '',
        licensePlate: '',
        capacity: '',
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData({
            ...vehicleData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVehicle(vehicleData);
            history.push('/vehicles');
        } catch (error) {
            console.error('Error creating vehicle:', error);
        }
    };

    return (
        <div className="vehicle-form">
            <h2>Add New Vehicle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Vehicle Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={vehicleData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="type">Vehicle Type:</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={vehicleData.type}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="licensePlate">License Plate:</label>
                    <input
                        type="text"
                        id="licensePlate"
                        name="licensePlate"
                        value={vehicleData.licensePlate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={vehicleData.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default VehicleForm;