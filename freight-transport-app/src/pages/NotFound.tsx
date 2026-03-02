import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="login-page">
            <div className="login-card fade-in-up">
                <p className="login-kicker">خطأ 404</p>
                <h2>الصفحة غير موجودة</h2>
                <p>المسار الذي طلبته غير متاح في النظام حالياً.</p>
                <Link className="primary-btn" to="/dashboard">
                    العودة إلى لوحة التحكم
                </Link>
            </div>
        </div>
    );
};

export default NotFound;