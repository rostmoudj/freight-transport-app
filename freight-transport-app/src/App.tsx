import { ComponentType, Suspense, lazy, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import useAuth, { AuthProvider, UserRole } from './hooks/useAuth';
import './styles/global.css';
import './styles/responsive.css';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Trips = lazy(() => import('./pages/Trips'));
const TripNew = lazy(() => import('./pages/TripNew'));
const TripDetail = lazy(() => import('./pages/TripDetail'));
const Fleet = lazy(() => import('./pages/Fleet'));
const FleetDetail = lazy(() => import('./pages/FleetDetail'));
const Drivers = lazy(() => import('./pages/Drivers'));
const DriverDetail = lazy(() => import('./pages/DriverDetail'));
const Clients = lazy(() => import('./pages/Clients'));
const ClientDetail = lazy(() => import('./pages/ClientDetail'));
const FinanceInvoices = lazy(() => import('./pages/FinanceInvoices'));
const FinanceExpenses = lazy(() => import('./pages/FinanceExpenses'));
const FinanceReport = lazy(() => import('./pages/FinanceReport'));
const Reports = lazy(() => import('./pages/Reports'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Settings = lazy(() => import('./pages/Settings'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

const roleLabelMap: Record<UserRole, string> = {
  'general-manager': 'مدير عام',
  'operations-manager': 'مدير عمليات',
  driver: 'سائق',
  client: 'عميل',
};

const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: UserRole[] }) => {
  const { user, loading, isAllowed } = useAuth();

  if (loading) {
    return <div className="centered-message">جاري تحميل الجلسة...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAllowed(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

const RouteFallback = () => <div className="centered-message">جاري تحميل الصفحة...</div>;

const withSuspense = (Component: ComponentType) => (
  <Suspense fallback={<RouteFallback />}>
    <Component />
  </Suspense>
);

const AppShell = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadNotifications = 4;

  const roleLabel = useMemo(() => {
    if (!user) {
      return '';
    }

    return roleLabelMap[user.role];
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} role={user.role} />

      <div className="app-main-area">
        <Header
          userName={user.name}
          roleLabel={roleLabel}
          unreadNotifications={unreadNotifications}
          onMenuToggle={() => setSidebarOpen(true)}
          onLogout={logout}
        />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const financeRoles: UserRole[] = ['general-manager', 'operations-manager'];

  return (
    <Routes>
      <Route path="/login" element={withSuspense(Login)} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={withSuspense(Dashboard)} />
          <Route path="/trips" element={withSuspense(Trips)} />
          <Route path="/trips/new" element={withSuspense(TripNew)} />
          <Route path="/trips/:id" element={withSuspense(TripDetail)} />
          <Route path="/fleet" element={withSuspense(Fleet)} />
          <Route path="/fleet/:id" element={withSuspense(FleetDetail)} />
          <Route path="/drivers" element={withSuspense(Drivers)} />
          <Route path="/drivers/:id" element={withSuspense(DriverDetail)} />
          <Route path="/clients" element={withSuspense(Clients)} />
          <Route path="/clients/:id" element={withSuspense(ClientDetail)} />
          <Route element={<ProtectedRoute allowedRoles={financeRoles} />}>
            <Route path="/finance/invoices" element={withSuspense(FinanceInvoices)} />
            <Route path="/finance/expenses" element={withSuspense(FinanceExpenses)} />
            <Route path="/finance/report" element={withSuspense(FinanceReport)} />
            <Route path="/reports" element={withSuspense(Reports)} />
          </Route>
          <Route path="/notifications" element={withSuspense(Notifications)} />
          <Route path="/settings" element={withSuspense(Settings)} />
          <Route path="/home" element={withSuspense(Home)} />
        </Route>
      </Route>

      <Route path="*" element={withSuspense(NotFound)} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;