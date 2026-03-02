import { AlertTriangle, Gauge, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFleetVehicles, getVehicleStatusLabel } from '../services/fleetService';
import { FleetVehicle } from '../types/fleet';

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

const isInspectionNear = (dateString: string) => {
    const [day, month, year] = dateString.split('/').map(Number);
    const inspectionDate = new Date(year, month - 1, day);
    const now = new Date();
    const diff = Math.ceil((inspectionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff <= 30;
};

const Fleet = () => {
    const vehicles = getFleetVehicles();

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <h2 className="panel-title">إدارة الأسطول</h2>
                <p className="panel-subtitle">حالة المركبات، نسبة الاستخدام، وفحوصات السلامة القادمة</p>
            </div>

            <div className="fleet-grid">
                {vehicles.map((vehicle) => {
                    const nearInspection = isInspectionNear(vehicle.nextInspection);

                    return (
                        <article key={vehicle.id} className="panel fleet-card fade-in-up">
                            <div className="fleet-card-head">
                                <div className="fleet-icon-wrap">
                                    <Truck size={22} />
                                </div>
                                <div>
                                    <h3>{vehicle.plate}</h3>
                                    <p className="panel-subtitle">
                                        {vehicle.type} • {vehicle.model} • {vehicle.year}
                                    </p>
                                </div>
                            </div>

                            <div className="fleet-status-row">
                                <span className={getVehicleStatusClass(vehicle.status)}>{getVehicleStatusLabel(vehicle.status)}</span>
                                <Link className="ghost-btn" to={`/fleet/${vehicle.id}`}>
                                    التفاصيل
                                </Link>
                            </div>

                            <div className="fleet-meta">
                                <div className="fleet-meta-item">
                                    <Gauge size={16} />
                                    <span>الاستخدام الشهري: {vehicle.utilizationPercent}%</span>
                                </div>
                                <progress
                                    className="usage-progress"
                                    value={vehicle.utilizationPercent}
                                    max={100}
                                    aria-label={`نسبة استخدام المركبة ${vehicle.plate}`}
                                />

                                <div className="fleet-meta-item">
                                    <ShieldCheck size={16} />
                                    <span>آخر فحص: {vehicle.lastInspection}</span>
                                </div>
                                <div className={`fleet-meta-item ${nearInspection ? 'warning-text' : ''}`}>
                                    {nearInspection ? <AlertTriangle size={16} /> : <Wrench size={16} />}
                                    <span>الفحص القادم: {vehicle.nextInspection}</span>
                                </div>
                                <div className="fleet-meta-item">
                                    <Truck size={16} />
                                    <span>إجمالي الكيلومترات: {new Intl.NumberFormat('fr-DZ').format(vehicle.totalKilometers)} كم</span>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default Fleet;
