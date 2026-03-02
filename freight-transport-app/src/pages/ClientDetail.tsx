import { ArrowRight, FileText, Mail, Phone, Route } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getClientById, getClientCategoryLabel } from '../services/clientService';
import { ClientCategory, ClientTripRecord } from '../types/client';

const getCategoryClass = (category: ClientCategory) => {
    switch (category) {
        case 'vip':
            return 'status transit';
        case 'enterprise':
            return 'status scheduled';
        default:
            return 'status completed';
    }
};

const getTripStatusClass = (status: ClientTripRecord['status']) => {
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

const ClientDetail = () => {
    const { id = '' } = useParams();
    const client = getClientById(id);

    if (!client) {
        return (
            <section className="page-section">
                <div className="panel fade-in-up">
                    <h2 className="panel-title">العميل غير موجود</h2>
                    <Link className="ghost-btn" to="/clients">
                        <ArrowRight size={15} />
                        العودة إلى قائمة العملاء
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
                        <h2 className="panel-title">ملف العميل: {client.name}</h2>
                        <p className="panel-subtitle">{client.address}</p>
                    </div>
                    <div className="trips-actions">
                        <span className={getCategoryClass(client.category)}>{getClientCategoryLabel(client.category)}</span>
                        <Link className="ghost-btn" to="/clients">
                            <ArrowRight size={15} />
                            العودة
                        </Link>
                    </div>
                </div>
            </div>

            <div className="driver-personal-grid">
                <article className="panel">
                    <h3 className="panel-title">معلومات التواصل</h3>
                    <ul className="detail-list">
                        <li>
                            <Phone size={16} />
                            <span>{client.phone}</span>
                        </li>
                        <li>
                            <Mail size={16} />
                            <span>{client.email}</span>
                        </li>
                        <li>
                            <FileText size={16} />
                            <span>{client.address}</span>
                        </li>
                    </ul>
                </article>

                <article className="panel">
                    <h3 className="panel-title">الوضع المالي</h3>
                    <p className="detail-note">
                        <strong>إجمالي المدفوع:</strong> {new Intl.NumberFormat('fr-DZ').format(client.totalPaid)} دج
                    </p>
                    <p className="detail-note warning-text">
                        <strong>إجمالي المستحق:</strong> {new Intl.NumberFormat('fr-DZ').format(client.totalOutstanding)} دج
                    </p>
                    <p className="detail-note">
                        <strong>ملاحظات:</strong> {client.notes || 'لا توجد ملاحظات'}
                    </p>
                </article>
            </div>

            <div className="panel fade-in-up">
                <h3 className="panel-title">سجل الرحلات الخاصة بالعميل</h3>
                <div className="table-scroll">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>رقم الرحلة</th>
                                <th>التاريخ</th>
                                <th>المسار</th>
                                <th>المبلغ</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {client.trips.map((trip) => (
                                <tr key={trip.tripId}>
                                    <td data-label="رقم الرحلة">{trip.tripId}</td>
                                    <td data-label="التاريخ">{trip.date}</td>
                                    <td data-label="المسار">
                                        <Route size={14} /> {trip.route}
                                    </td>
                                    <td data-label="المبلغ">{new Intl.NumberFormat('fr-DZ').format(trip.amount)} دج</td>
                                    <td data-label="الحالة">
                                        <span className={getTripStatusClass(trip.status)}>
                                            {trip.status === 'completed' ? 'منجزة' : trip.status === 'in-transit' ? 'في الطريق' : 'ملغاة'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ClientDetail;
