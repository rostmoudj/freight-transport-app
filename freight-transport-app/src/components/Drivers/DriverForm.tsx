import React, { useState } from 'react';
import { Driver } from '../../types/driver';
import { createDriver, updateDriver } from '../../services/driverService';

interface DriverFormProps {
  driver?: Driver;
  onSubmitSuccess: () => void;
}

const DriverForm: React.FC<DriverFormProps> = ({ driver, onSubmitSuccess }) => {
  const [name, setName] = useState(driver ? driver.name : '');
  const [licenseNumber, setLicenseNumber] = useState(driver ? driver.licenseNumber : '');
  const [phone, setPhone] = useState(driver ? driver.phone : '');
  const [email, setEmail] = useState(driver ? driver.email : '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (driver) {
        await updateDriver({ ...driver, name, licenseNumber, phone, email });
      } else {
        await createDriver({ name, licenseNumber, phone, email });
      }
      onSubmitSuccess();
    } catch (err) {
      setError('An error occurred while saving the driver details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{driver ? 'Edit Driver' : 'Add Driver'}</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>License Number:</label>
        <input
          type="text"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">{driver ? 'Update Driver' : 'Add Driver'}</button>
    </form>
  );
};

export default DriverForm;