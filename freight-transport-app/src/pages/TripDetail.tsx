import { ArrowRight, CalendarClock, CircleDollarSign, MapPinned, Truck, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getTripById } from '../services/tripService';
import { TripStatus } from '../types/trip';

const statusLabelMap: Record<TripStatus, string> = {
    scheduled: 'مجدولة',
    'in-transit': 'في الطريق',
    completed: 'منجزة',
    canceled: 'ملغاة',
    delayed: 'متأخرة',
};

const statusClassMap: Record<TripStatus, string> = {
    scheduled: 'status scheduled',
    'in-transit': 'status transit',
    completed: 'status completed',
    canceled: 'status canceled',
    delayed: 'status delayed',
};

const moneyFormatter = new Intl.NumberFormat('fr-DZ');

const TripDetail = () => {
    const { id = '' } = useParams();
    const trip = getTripById(id);

    if (!trip) {
        return (
            <section className="page-section">
                <div className="panel fade-in-up">
                    <h2 className="panel-title">الرحلة غير موجودة</h2>
                    <Link className="ghost-btn" to="/trips">
                        <ArrowRight size={15} />
                        العودة لقائمة الرحلات
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <div className="trips-head">
                    <div>
                        <h2 className="panel-title">تفاصيل الرحلة {trip.id}</h2>
                        <p className="panel-subtitle">{trip.client}</p>
                    </div>

                    <div className="trips-actions">
                        <span className={statusClassMap[trip.status]}>{statusLabelMap[trip.status]}</span>
                        <Link className="ghost-btn" to="/trips">
                            <ArrowRight size={15} />
                            العودة
                        </Link>
                    </div>
                </div>
            </div>

            <div className="trip-detail-grid">
                <article className="panel">
                    <h3 className="panel-title">معلومات التشغيل</h3>
                    <ul className="detail-list">
                        <li>
                            <User size={16} />
                            <span>السائق: {trip.driver}</span>
                        </li>
                        <li>
                            <Truck size={16} />
                            <span>المركبة: {trip.vehicle}</span>
                        </li>
                        <li>
                            <MapPinned size={16} />
                            <span>
                                المسار: {trip.origin} ← {trip.destination}
                            </span>
                        </li>
                        <li>
                            <CalendarClock size={16} />
                            <span>التاريخ والوقت المتوقع: {trip.expectedDateTime}</span>
                        </li>
                        <li>
                            <CircleDollarSign size={16} />
                            <span>التكلفة: {moneyFormatter.format(trip.cost)} دج</span>
                        </li>
                    </ul>
                </article>

                <article className="panel">
                    <h3 className="panel-title">الحمولة والملاحظات</h3>
                    <p className="detail-note">
                        <strong>نوع الحمولة:</strong> {trip.cargoType}
                    </p>
                    <p className="detail-note">
                        <strong>الوزن:</strong> {trip.weightTons} طن
                    </p>
                    <p className="detail-note">
                        <strong>ملاحظات:</strong> {trip.notes || 'لا توجد ملاحظات'}
                    </p>
                </article>
            </div>
        </section>
    );
};

export default TripDetail;