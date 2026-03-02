import { Bell, LogOut, Menu, UserCircle2 } from 'lucide-react';

type HeaderProps = {
    userName: string;
    roleLabel: string;
    unreadNotifications: number;
    onMenuToggle: () => void;
    onLogout: () => void;
};

const Header = ({
    userName,
    roleLabel,
    unreadNotifications,
    onMenuToggle,
    onLogout,
}: HeaderProps) => {
    return (
        <header className="app-header fade-in-up">
            <div className="header-start">
                <button className="icon-btn mobile-only" onClick={onMenuToggle} aria-label="فتح القائمة">
                    <Menu size={20} />
                </button>
                <div>
                    <h1 className="app-title">TRANS SYSTEM</h1>
                    <p className="app-subtitle">إدارة نقل البضائع</p>
                </div>
            </div>

            <div className="header-end">
                <button className="icon-btn" aria-label="الإشعارات">
                    <Bell size={19} />
                    {unreadNotifications > 0 && <span className="badge-dot">{unreadNotifications}</span>}
                </button>

                <div className="user-box">
                    <UserCircle2 size={18} />
                    <div>
                        <p className="user-name">{userName}</p>
                        <p className="user-role">{roleLabel}</p>
                    </div>
                </div>

                <button className="icon-btn" onClick={onLogout} aria-label="تسجيل الخروج">
                    <LogOut size={18} />
                </button>
            </div>
        </header>
    );
};

export default Header;