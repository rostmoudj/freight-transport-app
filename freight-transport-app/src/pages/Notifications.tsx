import { Bell, CheckCheck, Clock3, FileWarning, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getNotifications } from '../services/notificationService';
import { AppNotification } from '../types/notification';

const iconByType = (type: AppNotification['type']) => {
    switch (type) {
        case 'vehicle-doc':
            return <FileWarning size={16} />;
        case 'driver-license':
            return <FileWarning size={16} />;
        case 'trip-delay':
            return <Clock3 size={16} />;
        case 'new-request':
            return <Truck size={16} />;
        default:
            return <Bell size={16} />;
    }
};

const Notifications = () => {
    const [items, setItems] = useState(getNotifications());

    const unread = useMemo(() => items.filter((item) => !item.read).length, [items]);

    const toggleRead = (id: string) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: !item.read } : item)));
    };

    const markAllAsRead = () => {
        setItems((prev) => prev.map((item) => ({ ...item, read: true })));
    };

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <div className="trips-head">
                    <div>
                        <h2 className="panel-title">الإشعارات والتنبيهات</h2>
                        <p className="panel-subtitle">غير المقروء: {unread}</p>
                    </div>
                    <button className="ghost-btn" onClick={markAllAsRead}>
                        <CheckCheck size={16} />
                        تحديد الكل كمقروء
                    </button>
                </div>
            </div>

            <div className="panel fade-in-up">
                <ul className="alerts-list">
                    {items.map((item) => (
                        <li key={item.id} className={`notification-row ${item.read ? 'read' : 'unread'}`}>
                            <div className="fleet-doc-row">
                                {iconByType(item.type)}
                                <div>
                                    <p>{item.title}</p>
                                    <small>{item.message}</small>
                                </div>
                            </div>
                            <div className="trips-actions">
                                <small>{item.date}</small>
                                <button className="ghost-btn" onClick={() => toggleRead(item.id)}>
                                    {item.read ? 'غير مقروء' : 'مقروء'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Notifications;
