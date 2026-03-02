import { ArrowRight, BanknoteArrowUp, FileText, Phone, Star, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
    getDocumentStatusLabel,
    getDriverById,
    getDriverStatusLabel,
    getTripStatusLabel,
} from '../services/driverService';
import { DriverDocument, DriverProfile, DriverStatus, DriverTripRecord } from '../types/driver';

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

const getTripStatusClass = (status: DriverTripRecord['status']) => {
    switch (status) {
        case 'completed':
            return 'status completed';
        case 'in-transit':
            return 'status transit';
        case 'canceled':
            return 'status canceled';
        default:
            return 'status';
    }
};

const getDocumentStatusClass = (status: DriverDocument['status']) => {
    switch (status) {
        case 'valid':
            return 'status completed';
        case 'expiring':
            return 'status delayed';
        case 'expired':
            return 'status canceled';
        default:
            return 'status';
    }
};

const DriverDetail = () => {
    const { id = '' } = useParams();
    const driver = getDriverById(id);

    if (!driver) {
        return (
            <section className="page-section">
                <div className="panel fade-in-up">
                    <h2 className="panel-title">السائق غير موجود</h2>
                    <Link className="ghost-btn" to="/drivers">
                        <ArrowRight size={15} />
                        العودة إلى قائمة السائقين
                    </Link>
                </div>
            </section>
        );
    }

    const profile: DriverProfile = driver;
    const totalBalance = profile.salary + profile.commission;

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <div className="trips-head">
                    <div>
                        <h2 className="panel-title">ملف السائق: {profile.fullName}</h2>
                        <p className="panel-subtitle">{profile.address} • {profile.licenseNumber}</p>
                    </div>
                    <div className="trips-actions">
                        <span className={getDriverStatusClass(profile.status)}>{getDriverStatusLabel(profile.status)}</span>
                        <Link className="ghost-btn" to="/drivers">
                            <ArrowRight size={15} />
                            العودة
                        </Link>
                    </div>
                </div>
            </div>

            <div className="fleet-summary-grid">
                <article className="panel stat-card">
                    <div>
                        <p>التقييم العام</p>
                        <h3>{profile.rating} / 5</h3>
                    </div>
                    <Star size={24} />
                </article>
                <article className="panel stat-card">
                    <div>
                        <p>الرحلات المنجزة</p>
                        <h3>{new Intl.NumberFormat('fr-DZ').format(profile.completedTripsCount)}</h3>
                    </div>
                    <UserRound size={24} />
                </article>
                <article className="panel stat-card">
                    <div>
                        <p>الرصيد (راتب + عمولات)</p>
                        <h3>{new Intl.NumberFormat('fr-DZ').format(totalBalance)} دج</h3>
                    </div>
                    <BanknoteArrowUp size={24} />
                </article>
            </div>

            <div className="driver-personal-grid">
                <article className="panel">
                    <h3 className="panel-title">البيانات الشخصية</h3>
                    <ul className="detail-list">
                        <li>
                            <UserRound size={16} />
                            <span>الاسم الكامل: {profile.fullName}</span>
                        </li>
                        <li>
                            <Phone size={16} />
                            <span>الهاتف: {profile.phoneNumber}</span>
                        </li>
                        <li>
                            <FileText size={16} />
                            <span>العنوان: {profile.address}</span>
                        </li>
                        <li>
                            <FileText size={16} />
                            <span>
                                الرخصة: {profile.licenseNumber} • تنتهي في {profile.licenseExpiryDate}
                            </span>
                        </li>
                    </ul>
                </article>

                <article className="panel">
                    <h3 className="panel-title">الرصيد المالي</h3>
                    <p className="detail-note">
                        <strong>الراتب الأساسي:</strong> {new Intl.NumberFormat('fr-DZ').format(profile.salary)} دج
                    </p>
                    <p className="detail-note">
                        <strong>العمولات:</strong> {new Intl.NumberFormat('fr-DZ').format(profile.commission)} دج
                    </p>
                    <p className="detail-note">
                        <strong>الإجمالي:</strong> {new Intl.NumberFormat('fr-DZ').format(totalBalance)} دج
                    </p>
                </article>
            </div>

            <div className="panel fade-in-up">
                <h3 className="panel-title">سجل الرحلات مع تقييم كل رحلة</h3>
                <div className="table-scroll">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>رقم الرحلة</th>
                                <th>التاريخ</th>
                                <th>المسار</th>
                                <th>التقييم</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profile.trips.map((trip) => (
                                <tr key={trip.tripId}>
                                    <td data-label="رقم الرحلة">{trip.tripId}</td>
                                    <td data-label="التاريخ">{trip.date}</td>
                                    <td data-label="المسار">{trip.route}</td>
                                    <td data-label="التقييم">{trip.rating} / 5</td>
                                    <td data-label="الحالة">
                                        <span className={getTripStatusClass(trip.status)}>{getTripStatusLabel(trip.status)}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="panel fade-in-up">
                <h3 className="panel-title">وثائق السائق</h3>
                <ul className="alerts-list">
                    {profile.documents.map((document) => (
                        <li
                            className={`alert-row ${document.status === 'expired' ? 'critical' : document.status === 'expiring' ? 'warning' : 'info'}`}
                            key={document.id}
                        >
                            <div className="fleet-doc-row">
                                <FileText size={16} />
                                <div>
                                    <p>{document.label}</p>
                                    <small>تاريخ الانتهاء: {document.expiryDate}</small>
                                </div>
                            </div>
                            <span className={getDocumentStatusClass(document.status)}>{getDocumentStatusLabel(document.status)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default DriverDetail;
