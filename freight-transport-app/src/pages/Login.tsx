import { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const { login, loading, error, user } = useAuth();
    const [email, setEmail] = useState('gm@transsystem.dz');
    const [password, setPassword] = useState('123456');
    const [remember, setRemember] = useState(true);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await login(email, password, remember);
    };

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="login-page">
            <form className="login-card fade-in-up" onSubmit={handleSubmit}>
                <p className="login-kicker">نظام إدارة النقل</p>
                <h2>تسجيل الدخول</h2>

                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@transsystem.dz"
                    required
                />

                <label htmlFor="password">كلمة المرور</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••"
                    required
                />

                <label className="remember-row" htmlFor="rememberMe">
                    <input
                        id="rememberMe"
                        type="checkbox"
                        checked={remember}
                        onChange={(event) => setRemember(event.target.checked)}
                    />
                    <span>تذكّر الجلسة</span>
                </label>

                {error && <p className="error-text">{error}</p>}

                <button className="primary-btn" type="submit" disabled={loading}>
                    {loading ? 'جاري التحقق...' : 'دخول'}
                </button>

                <div className="credentials-note">
                    <p>حسابات تجريبية:</p>
                    <small>gm@transsystem.dz / ops@transsystem.dz / driver@transsystem.dz / client@transsystem.dz</small>
                    <small>كلمة المرور لجميع الحسابات: 123456</small>
                </div>
            </form>
        </div>
    );
};

export default Login;