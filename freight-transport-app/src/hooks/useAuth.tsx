import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

type UserRole = 'general-manager' | 'operations-manager' | 'driver' | 'client';

type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
};

type AuthState = {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string, remember: boolean) => Promise<boolean>;
    logout: () => void;
    isAllowed: (roles?: UserRole[]) => boolean;
};

const STORAGE_KEY = 'trans-system-auth-user';

const MOCK_USERS: Array<AuthUser & { password: string }> = [
    {
        id: 'u-1',
        name: 'عبد القادر بن سالم',
        email: 'gm@transsystem.dz',
        role: 'general-manager',
        password: '123456',
    },
    {
        id: 'u-2',
        name: 'ريم خوجة',
        email: 'ops@transsystem.dz',
        role: 'operations-manager',
        password: '123456',
    },
    {
        id: 'u-3',
        name: 'حسن بوراس',
        email: 'driver@transsystem.dz',
        role: 'driver',
        password: '123456',
    },
    {
        id: 'u-4',
        name: 'شركة الواحة للتغليف',
        email: 'client@transsystem.dz',
        role: 'client',
        password: '123456',
    },
];

const AuthContext = createContext<AuthState | undefined>(undefined);

const getStoredUser = (): AuthUser | null => {
    const localData = localStorage.getItem(STORAGE_KEY);
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    const raw = localData ?? sessionData;

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as AuthUser;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setUser(getStoredUser());
        setLoading(false);
    }, []);

    const login = async (email: string, password: string, remember: boolean): Promise<boolean> => {
        setLoading(true);
        setError(null);

        const foundUser = MOCK_USERS.find(
            (candidate) => candidate.email.toLowerCase() === email.toLowerCase() && candidate.password === password
        );

        await new Promise((resolve) => setTimeout(resolve, 350));

        if (!foundUser) {
            setLoading(false);
            setError('بيانات الدخول غير صحيحة');
            return false;
        }

        const { password: _pass, ...safeUser } = foundUser;
        const storage = remember ? localStorage : sessionStorage;

        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
        storage.setItem(STORAGE_KEY, JSON.stringify(safeUser));

        setUser(safeUser);
        setLoading(false);
        return true;
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
        setUser(null);
        setError(null);
    };

    const isAllowed = (roles?: UserRole[]) => {
        if (!user) {
            return false;
        }

        if (!roles || roles.length === 0) {
            return true;
        }

        return roles.includes(user.role);
    };

    const value = useMemo(
        () => ({ user, loading, error, login, logout, isAllowed }),
        [user, loading, error]
    );

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
};

export type { AuthUser, UserRole };
export default useAuth;