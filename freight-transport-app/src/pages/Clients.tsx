import { Building2, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getClientCategoryLabel, getClients } from '../services/clientService';
import { ClientCategory } from '../types/client';

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

const Clients = () => {
    const clients = getClients();

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <h2 className="panel-title">إدارة العملاء</h2>
                <p className="panel-subtitle">متابعة معلومات العملاء، الرحلات، والمبالغ المدفوعة والمستحقة</p>
            </div>

            <div className="clients-grid">
                {clients.map((client) => (
                    <article className="panel fade-in-up" key={client.id}>
                        <div className="trips-head">
                            <div>
                                <h3>{client.name}</h3>
                                <p className="panel-subtitle">{client.address}</p>
                            </div>
                            <span className={getCategoryClass(client.category)}>{getClientCategoryLabel(client.category)}</span>
                        </div>

                        <div className="client-meta">
                            <div className="fleet-meta-item">
                                <Phone size={16} />
                                <span>{client.phone}</span>
                            </div>
                            <div className="fleet-meta-item">
                                <Mail size={16} />
                                <span>{client.email}</span>
                            </div>
                            <div className="fleet-meta-item">
                                <Building2 size={16} />
                                <span>مدفوع: {new Intl.NumberFormat('fr-DZ').format(client.totalPaid)} دج</span>
                            </div>
                            <div className="fleet-meta-item warning-text">
                                <span>مستحق: {new Intl.NumberFormat('fr-DZ').format(client.totalOutstanding)} دج</span>
                            </div>
                        </div>

                        <Link className="ghost-btn" to={`/clients/${client.id}`}>
                            فتح ملف العميل
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Clients;
