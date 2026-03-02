import { Link } from 'react-router-dom';
import { AlertTriangle, Phone, Star, UserRound } from 'lucide-react';
import { DriverStatus } from '../types/driver';
import { getDrivers, getDriverStatusLabel } from '../services/driverService';

const getDriverStatusClass = (status: DriverStatus) => {
    switch (status) {
        case 'available':
            return 'status completed';
        case 'in-trip':
            return 'status transit';
        case 'on-leave':
            return 'status delayed';
        case 'suspended':
            return 'status canceled';
        default:
            return 'status';
    }
};

const isLicenseNearExpiry = (dateString: string) => {
    const [day, month, year] = dateString.split('/').map(Number);
    const expiryDate = new Date(year, month - 1, day);
    const now = new Date();
    const diff = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff <= 30;
};

const Drivers = () => {
    const drivers = getDrivers();

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <h2 className="panel-title">إدارة السائقين</h2>
                <p className="panel-subtitle">متابعة الحالة، الرخصة، التقييم وعدد الرحلات المنجزة</p>
            </div>

            <div className="drivers-grid">
                {drivers.map((driver) => {
                    const nearExpiry = isLicenseNearExpiry(driver.licenseExpiryDate);

                    return (
                        <article key={driver.id} className="panel driver-card fade-in-up">
                            <div className="driver-card-head">
                                <div className="driver-avatar">
                                    <UserRound size={20} />
                                </div>
                                <div>
                                    <h3>{driver.fullName}</h3>
                                    <p className="panel-subtitle">{driver.address}</p>
                                </div>
                            </div>

                            <div className="fleet-status-row">
                                <span className={getDriverStatusClass(driver.status)}>{getDriverStatusLabel(driver.status)}</span>
                                <Link className="ghost-btn" to={`/drivers/${driver.id}`}>
                                    الملف الكامل
                                </Link>
                            </div>

                            <div className="driver-meta">
                                <div className="fleet-meta-item">
                                    <Phone size={16} />
                                    <span>{driver.phoneNumber}</span>
                                </div>
                                <div className={`fleet-meta-item ${nearExpiry ? 'warning-text' : ''}`}>
                                    {nearExpiry ? <AlertTriangle size={16} /> : <UserRound size={16} />}
                                    <span>الرخصة: {driver.licenseNumber} • {driver.licenseExpiryDate}</span>
                                </div>
                                <div className="fleet-meta-item">
                                    <Star size={16} />
                                    <span>التقييم: {driver.rating} / 5</span>
                                </div>
                                <div className="fleet-meta-item">
                                    <span>الرحلات المنجزة: {new Intl.NumberFormat('fr-DZ').format(driver.completedTripsCount)}</span>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default Drivers;
