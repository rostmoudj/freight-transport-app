import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getProfitLossSeries } from '../services/financeService';

const FinanceReport = () => {
    const data = getProfitLossSeries();
    const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <h2 className="panel-title">تقرير الربح والخسارة</h2>
                <p className="panel-subtitle">مقارنة الإيرادات والمصاريف حسب الفترة</p>
            </div>

            <div className="fleet-summary-grid">
                <article className="panel stat-card">
                    <div>
                        <p>إجمالي الإيرادات</p>
                        <h3>{new Intl.NumberFormat('fr-DZ').format(totalRevenue)} دج</h3>
                    </div>
                </article>
                <article className="panel stat-card">
                    <div>
                        <p>إجمالي المصاريف</p>
                        <h3>{new Intl.NumberFormat('fr-DZ').format(totalExpenses)} دج</h3>
                    </div>
                </article>
                <article className="panel stat-card">
                    <div>
                        <p>صافي الربح</p>
                        <h3>{new Intl.NumberFormat('fr-DZ').format(totalRevenue - totalExpenses)} دج</h3>
                    </div>
                </article>
            </div>

            <div className="panel fade-in-up">
                <div className="chart-wrap">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2B324A" />
                            <XAxis dataKey="period" stroke="#A8AEC5" />
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
                            <Bar dataKey="revenue" name="الإيرادات" fill="#3B82F6" />
                            <Bar dataKey="expenses" name="المصاريف" fill="#F59E0B" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default FinanceReport;
