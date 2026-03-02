import {
    Bell,
    ChartBar,
    ClipboardList,
    LayoutDashboard,
    Settings,
    Truck,
    UserCircle2,
    Users,
    Wallet,
    X,
} from 'lucide-react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../hooks/useAuth';

type SidebarProps = {
    open: boolean;
    onClose: () => void;
    role: UserRole;
};

type NavItem = {
    label: string;
    to: string;
    icon: ReactNode;
    roles?: UserRole[];
};

const navItems: NavItem[] = [
    { label: 'لوحة التحكم', to: '/dashboard', icon: <LayoutDashboard size={17} /> },
    { label: 'الرحلات', to: '/trips', icon: <ClipboardList size={17} /> },
    { label: 'الأسطول', to: '/fleet', icon: <Truck size={17} /> },
    { label: 'السائقون', to: '/drivers', icon: <UserCircle2 size={17} /> },
    { label: 'العملاء', to: '/clients', icon: <Users size={17} />, roles: ['general-manager', 'operations-manager'] },
    { label: 'المالية', to: '/finance/invoices', icon: <Wallet size={17} />, roles: ['general-manager', 'operations-manager'] },
    { label: 'التقارير', to: '/reports', icon: <ChartBar size={17} />, roles: ['general-manager', 'operations-manager'] },
    { label: 'الإشعارات', to: '/notifications', icon: <Bell size={17} /> },
    { label: 'الإعدادات', to: '/settings', icon: <Settings size={17} />, roles: ['general-manager'] },
];

const Sidebar = ({ open, onClose, role }: SidebarProps) => {
    const allowedItems = navItems.filter((item) => !item.roles || item.roles.includes(role));

    return (
        <>
            <aside className={`app-sidebar ${open ? 'is-open' : ''}`}>
                <div className="sidebar-head">
                    <h2>الأقسام</h2>
                    <button className="icon-btn mobile-only" onClick={onClose} aria-label="إغلاق القائمة">
                        <X size={18} />
                    </button>
                </div>

                <nav>
                    <ul className="sidebar-list">
                        {allowedItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                                    onClick={onClose}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {open && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
        </>
    );
};

export default Sidebar;