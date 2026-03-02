import { ArrowRight, CircleDollarSign, FileText, Gauge, Route, ShieldAlert, Truck, Wrench } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
    getDocumentStatusLabel,
    getFleetVehicleById,
    getTripStatusLabel,
    getVehicleStatusLabel,
} from '../services/fleetService';
import { FleetVehicle, MaintenanceRecord, VehicleDocument, VehicleTripRecord } from '../types/fleet';

const getVehicleStatusClass = (status: FleetVehicle['status']) => {
    switch (status) {
        case 'available':
            return 'status completed';
        case 'in-trip':
            return 'status transit';
        case 'maintenance':
            return 'status delayed';
        case 'out-of-service':
            return 'status canceled';
        default:
            return 'status';
    }
};

const getTripStatusClass = (status: VehicleTripRecord['status']) => {
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

const getDocumentStatusClass = (status: VehicleDocument['status']) => {
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

const FleetDetail = () => {
    const { id = '' } = useParams();
    const vehicle = getFleetVehicleById(id);

    if (!vehicle) {
        return (
            <section className="page-section">
                <div className="panel fade-in-up">
                    <h2 className="panel-title">المركبة غير موجودة</h2>
                    <Link className="ghost-btn" to="/fleet">
                        <ArrowRight size={15} />
                        العودة إلى الأسطول
                    </Link>
                </div>
            </section>
        );
    }

    const maintenanceTotal = vehicle.maintenance.reduce((sum, item) => sum + item.cost, 0);

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <div className="trips-head">
                    <div>
                        <h2 className="panel-title">تفاصيل المركبة {vehicle.plate}</h2>
                        <p className="panel-subtitle">
                            {vehicle.type} • {vehicle.model} • {vehicle.year}
                        </p>
                    </div>
                    <div className="trips-actions">
                        <span className={getVehicleStatusClass(vehicle.status)}>{getVehicleStatusLabel(vehicle.status)}</span>
                        <Link className="ghost-btn" to="/fleet">
                            <ArrowRight size={15} />
                            العودة
                        </Link>
                    </div>
                </div>
            </div>

            <div className="fleet-summary-grid">
                <article className="panel stat-card">
                    <div>
                        <p>إجمالي الكيلومترات</p>
                        <h3>{new Intl.NumberFormat('fr-DZ').format(vehicle.totalKilometers)} كم</h3>
                    </div>
                    <Gauge size={24} />
                </article>
                <article className="panel stat-card">
                    <div>
                        <p>عدد الرحلات المسجلة</p>
                        <h3>{vehicle.trips.length}</h3>
                    </div>
                    <Route size={24} />
                </article>
                <article className="panel stat-card">
                    <div>
                        <p>إجمالي كلفة الصيانة</p>
                        <h3>{new Intl.NumberFormat('fr-DZ').format(maintenanceTotal)} دج</h3>
                    </div>
                    <CircleDollarSign size={24} />
                </article>
            </div>

            <div className="panel fade-in-up">
                <h3 className="panel-title">سجل الرحلات</h3>
                <div className="table-scroll">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>رقم الرحلة</th>
                                <th>التاريخ</th>
                                <th>السائق</th>
                                <th>المسار</th>
                                <th>المسافة</th>
                                <th>الحالة</th>
                                <th>التكلفة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicle.trips.map((trip) => (
                                <tr key={trip.tripId}>
                                    <td data-label="رقم الرحلة">{trip.tripId}</td>
                                    <td data-label="التاريخ">{trip.date}</td>
                                    <td data-label="السائق">{trip.driver}</td>
                                    <td data-label="المسار">
                                        {trip.origin} ← {trip.destination}
                                    </td>
                                    <td data-label="المسافة">{trip.kilometers} كم</td>
                                    <td data-label="الحالة">
                                        <span className={getTripStatusClass(trip.status)}>{getTripStatusLabel(trip.status)}</span>
                                    </td>
                                    <td data-label="التكلفة">{new Intl.NumberFormat('fr-DZ').format(trip.cost)} دج</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="fleet-detail-bottom">
                <article className="panel fade-in-up">
                    <h3 className="panel-title">سجل الصيانة</h3>
                    <ul className="alerts-list">
                        {vehicle.maintenance.map((item: MaintenanceRecord) => (
                            <li className="alert-row info" key={item.id}>
                                <div>
                                    <p>
                                        {item.type} • {item.date}
                                    </p>
                                    <small>{item.description}</small>
                                </div>
                                <span>{new Intl.NumberFormat('fr-DZ').format(item.cost)} دج</span>
                            </li>
                        ))}
                    </ul>
                </article>

                <article className="panel fade-in-up">
                    <h3 className="panel-title">وثائق المركبة</h3>
                    <ul className="alerts-list">
                        {vehicle.documents.map((document) => (
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
                    <div className="fleet-inspection-box">
                        <ShieldAlert size={16} />
                        <span>آخر فحص: {vehicle.lastInspection} • الفحص القادم: {vehicle.nextInspection}</span>
                    </div>
                </article>
            </div>

            <div className="panel fade-in-up">
                <h3 className="panel-title">مؤشر استخدام المركبة الشهري</h3>
                <progress
                    className="usage-progress"
                    value={vehicle.utilizationPercent}
                    max={100}
                    aria-label={`نسبة استخدام المركبة ${vehicle.plate}`}
                />
                <p className="panel-subtitle">نسبة الاستخدام الحالية: {vehicle.utilizationPercent}%</p>
            </div>
        </section>
    );
};

export default FleetDetail;
