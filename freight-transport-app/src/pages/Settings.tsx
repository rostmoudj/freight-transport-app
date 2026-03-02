import { Download, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { buildBackupPayload, defaultCompanySettings, defaultPricingSettings, userPermissions } from '../services/settingsService';

const Settings = () => {
    const [company, setCompany] = useState(defaultCompanySettings);
    const [pricing, setPricing] = useState(defaultPricingSettings);
    const [lightMode, setLightMode] = useState(false);

    const toggleTheme = () => {
        const next = !lightMode;
        setLightMode(next);
        document.body.classList.toggle('theme-light', next);
    };

    const exportBackup = () => {
        const payload = buildBackupPayload(company, pricing);
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'trans-system-backup.json';
        link.click();
        URL.revokeObjectURL(link.href);
    };

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <div className="trips-head">
                    <div>
                        <h2 className="panel-title">الإعدادات</h2>
                        <p className="panel-subtitle">معلومات الشركة، الصلاحيات، التسعير، النسخ الاحتياطي والوضع الليلي/النهاري</p>
                    </div>
                    <button className="ghost-btn" onClick={toggleTheme}>
                        {lightMode ? <Moon size={16} /> : <Sun size={16} />}
                        {lightMode ? 'الوضع الليلي' : 'الوضع النهاري'}
                    </button>
                </div>
            </div>

            <div className="settings-grid">
                <article className="panel">
                    <h3 className="panel-title">معلومات الشركة</h3>
                    <div className="trip-form">
                        <label>
                            اسم الشركة
                            <input value={company.companyName} onChange={(e) => setCompany({ ...company, companyName: e.target.value })} />
                        </label>
                        <label>
                            الهاتف
                            <input value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} />
                        </label>
                        <label>
                            العنوان
                            <input value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} />
                        </label>
                    </div>
                </article>

                <article className="panel">
                    <h3 className="panel-title">أسعار الكيلومتر</h3>
                    <div className="trip-form">
                        <label>
                            شحنة عادية
                            <input
                                type="number"
                                value={pricing.standardRatePerKm}
                                onChange={(e) => setPricing({ ...pricing, standardRatePerKm: Number(e.target.value) })}
                            />
                        </label>
                        <label>
                            شحنة مبردة
                            <input
                                type="number"
                                value={pricing.coldChainRatePerKm}
                                onChange={(e) => setPricing({ ...pricing, coldChainRatePerKm: Number(e.target.value) })}
                            />
                        </label>
                        <label>
                            حمولة ثقيلة
                            <input
                                type="number"
                                value={pricing.heavyLoadRatePerKm}
                                onChange={(e) => setPricing({ ...pricing, heavyLoadRatePerKm: Number(e.target.value) })}
                            />
                        </label>
                    </div>
                </article>
            </div>

            <div className="panel">
                <h3 className="panel-title">إدارة المستخدمين والصلاحيات</h3>
                <div className="table-scroll">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>الدور</th>
                                <th>الصلاحيات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPermissions.map((item) => (
                                <tr key={item.role}>
                                    <td data-label="الدور">{item.role}</td>
                                    <td data-label="الصلاحيات">{item.permissions.join('، ')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="panel">
                <button className="primary-btn" onClick={exportBackup}>
                    <Download size={16} />
                    النسخ الاحتياطي (Export JSON)
                </button>
            </div>
        </section>
    );
};

export default Settings;
