import { AlertTriangle, CheckCircle2, CircleDollarSign, Truck } from 'lucide-react';
import {
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import {
    alerts,
    dashboardStats,
    performanceSeries,
    recentTrips,
    statusDistribution,
    TripStatus,
} from '../utils/mockData';

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

const donutColors = ['#3B82F6', '#FACC15', '#22C55E', '#EF4444', '#F59E0B'];

const dzdFormatter = new Intl.NumberFormat('fr-DZ');

const Dashboard = () => {
    return (
        <section className="page-section">
            <div className="stats-grid">
                <article className="stat-card fade-in-up">
                    <div>
                        <p>إجمالي الرحلات اليوم</p>
                        <h3>{dashboardStats.totalTripsToday}</h3>
                    </div>
                    <Truck size={24} />
                </article>

                <article className="stat-card fade-in-up delay-1">
                    <div>
                        <p>الرحلات المنجزة هذا الشهر</p>
                        <h3>{dashboardStats.completedTripsMonth}</h3>
                    </div>
                    <CheckCircle2 size={24} />
                </article>

                <article className="stat-card fade-in-up delay-2">
                    <div>
                        <p>الإيرادات الشهرية</p>
                        <h3>{dzdFormatter.format(dashboardStats.monthlyRevenue)} دج</h3>
                    </div>
                    <CircleDollarSign size={24} />
                </article>

                <article className="stat-card fade-in-up delay-3">
                    <div>
                        <p>المركبات في الصيانة</p>
                        <h3>{dashboardStats.vehiclesInMaintenance}</h3>
                    </div>
                    <AlertTriangle size={24} />
                </article>
            </div>

            <div className="charts-grid">
                <article className="panel fade-in-up">
                    <h3 className="panel-title">تطور الرحلات والإيرادات (آخر 6 أشهر)</h3>
                    <div className="chart-wrap">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceSeries}>
                                <XAxis dataKey="month" stroke="#A8AEC5" />
                                <YAxis stroke="#A8AEC5" />
                                <Tooltip
                                    contentStyle={{
                                        background: '#111523',
                                        border: '1px solid #2B324A',
                                        borderRadius: '10px',
                                        color: '#fff',
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="trips" name="الرحلات" stroke="#F59E0B" strokeWidth={3} />
                                <Line type="monotone" dataKey="revenue" name="الإيرادات" stroke="#60A5FA" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </article>

                <article className="panel fade-in-up">
                    <h3 className="panel-title">توزيع حالات الرحلات</h3>
                    <div className="chart-wrap">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusDistribution}
                                    innerRadius={55}
                                    outerRadius={92}
                                    dataKey="value"
                                    nameKey="name"
                                    paddingAngle={2}
                                >
                                    {statusDistribution.map((entry, index) => (
                                        <Cell key={entry.key} fill={donutColors[index % donutColors.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip
                                    contentStyle={{
                                        background: '#111523',
                                        border: '1px solid #2B324A',
                                        borderRadius: '10px',
                                        color: '#fff',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </article>
            </div>

            <div className="panel fade-in-up">
                <h3 className="panel-title">آخر 10 رحلات</h3>
                <div className="table-scroll">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>رقم الرحلة</th>
                                <th>التاريخ</th>
                                <th>السائق</th>
                                <th>المركبة</th>
                                <th>الانطلاق</th>
                                <th>الوجهة</th>
                                <th>الحمولة</th>
                                <th>الحالة</th>
                                <th>التكلفة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTrips.map((trip) => (
                                <tr key={trip.id}>
                                    <td data-label="رقم الرحلة">{trip.id}</td>
                                    <td data-label="التاريخ">{trip.date}</td>
                                    <td data-label="السائق">{trip.driver}</td>
                                    <td data-label="المركبة">{trip.vehicle}</td>
                                    <td data-label="الانطلاق">{trip.origin}</td>
                                    <td data-label="الوجهة">{trip.destination}</td>
                                    <td data-label="الحمولة">{trip.cargo}</td>
                                    <td data-label="الحالة">
                                        <span className={statusClassMap[trip.status]}>{statusLabelMap[trip.status]}</span>
                                    </td>
                                    <td data-label="التكلفة">{dzdFormatter.format(trip.cost)} دج</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="panel fade-in-up">
                <h3 className="panel-title">التنبيهات</h3>
                <ul className="alerts-list">
                    {alerts.map((alert) => (
                        <li key={alert.id} className={`alert-row ${alert.level}`}>
                            <div>
                                <p>{alert.title}</p>
                                <small>الاستحقاق: {alert.dueDate}</small>
                            </div>
                            <span>{alert.level === 'critical' ? 'حرج' : alert.level === 'warning' ? 'تنبيه' : 'معلومة'}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Dashboard;