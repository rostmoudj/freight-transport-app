import { DriverProfile, DriverStatus } from '../types/driver';

const toDate = (value: string) => {
    const [day, month, year] = value.split('/').map(Number);
    return new Date(year, month - 1, day);
};

const computeDocumentStatus = (expiryDate: string): 'valid' | 'expiring' | 'expired' => {
    const now = new Date();
    const expiry = toDate(expiryDate);
    const diff = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diff < 0) {
        return 'expired';
    }

    if (diff <= 30) {
        return 'expiring';
    }

    return 'valid';
};

const driversStore: DriverProfile[] = [
    {
        id: 'drv-1',
        fullName: 'رضا ماحي',
        phoneNumber: '0550 12 34 11',
        address: 'الجزائر العاصمة',
        licenseNumber: 'LIC-2021-7721',
        licenseExpiryDate: '25/03/2026',
        status: 'in-trip',
        rating: 4.7,
        completedTripsCount: 186,
        salary: 78000,
        commission: 32000,
        trips: [
            { tripId: 'TR-2401', date: '02/03/2026', route: 'الجزائر ← سطيف', rating: 5, status: 'in-transit' },
            { tripId: 'TR-2391', date: '26/02/2026', route: 'البليدة ← بسكرة', rating: 4, status: 'completed' },
            { tripId: 'TR-2384', date: '22/02/2026', route: 'الجزائر ← عنابة', rating: 5, status: 'completed' },
        ],
        documents: [
            { id: 'd1', label: 'رخصة القيادة', expiryDate: '25/03/2026', status: 'expiring' },
            { id: 'd2', label: 'البطاقة المهنية', expiryDate: '11/08/2026', status: 'valid' },
            { id: 'd3', label: 'شهادة طبية', expiryDate: '15/05/2026', status: 'valid' },
        ],
    },
    {
        id: 'drv-2',
        fullName: 'رابح سالم',
        phoneNumber: '0661 80 55 19',
        address: 'وهران',
        licenseNumber: 'LIC-2019-9011',
        licenseExpiryDate: '18/09/2026',
        status: 'available',
        rating: 4.3,
        completedTripsCount: 142,
        salary: 69000,
        commission: 21500,
        trips: [
            { tripId: 'TR-2402', date: '02/03/2026', route: 'وهران ← تلمسان', rating: 4, status: 'completed' },
            { tripId: 'TR-2392', date: '27/02/2026', route: 'الشلف ← تيبازة', rating: 4, status: 'completed' },
            { tripId: 'TR-2380', date: '18/02/2026', route: 'مستغانم ← الجزائر', rating: 5, status: 'completed' },
        ],
        documents: [
            { id: 'd4', label: 'رخصة القيادة', expiryDate: '18/09/2026', status: 'valid' },
            { id: 'd5', label: 'البطاقة المهنية', expiryDate: '05/11/2026', status: 'valid' },
            { id: 'd6', label: 'شهادة طبية', expiryDate: '29/03/2026', status: 'expiring' },
        ],
    },
    {
        id: 'drv-3',
        fullName: 'سفيان عياش',
        phoneNumber: '0549 31 20 45',
        address: 'البليدة',
        licenseNumber: 'LIC-2020-5517',
        licenseExpiryDate: '10/04/2026',
        status: 'available',
        rating: 4.9,
        completedTripsCount: 210,
        salary: 84000,
        commission: 41000,
        trips: [
            { tripId: 'TR-2403', date: '01/03/2026', route: 'البليدة ← باتنة', rating: 5, status: 'completed' },
            { tripId: 'TR-2390', date: '24/02/2026', route: 'المدية ← وهران', rating: 5, status: 'completed' },
            { tripId: 'TR-2372', date: '14/02/2026', route: 'الجزائر ← غرداية', rating: 4, status: 'completed' },
        ],
        documents: [
            { id: 'd7', label: 'رخصة القيادة', expiryDate: '10/04/2026', status: 'valid' },
            { id: 'd8', label: 'البطاقة المهنية', expiryDate: '12/06/2026', status: 'valid' },
            { id: 'd9', label: 'شهادة طبية', expiryDate: '03/03/2026', status: 'expiring' },
        ],
    },
    {
        id: 'drv-4',
        fullName: 'مراد بن حمودة',
        phoneNumber: '0560 90 14 80',
        address: 'عنابة',
        licenseNumber: 'LIC-2018-2044',
        licenseExpiryDate: '01/03/2026',
        status: 'suspended',
        rating: 3.6,
        completedTripsCount: 95,
        salary: 62000,
        commission: 9000,
        trips: [
            { tripId: 'TR-2404', date: '01/03/2026', route: 'عنابة ← قسنطينة', rating: 2, status: 'canceled' },
            { tripId: 'TR-2379', date: '18/02/2026', route: 'الجزائر ← غرداية', rating: 4, status: 'completed' },
            { tripId: 'TR-2368', date: '09/02/2026', route: 'عنابة ← سكيكدة', rating: 3, status: 'completed' },
        ],
        documents: [
            { id: 'd10', label: 'رخصة القيادة', expiryDate: '01/03/2026', status: 'expired' },
            { id: 'd11', label: 'البطاقة المهنية', expiryDate: '01/02/2026', status: 'expired' },
            { id: 'd12', label: 'شهادة طبية', expiryDate: '17/03/2026', status: 'expiring' },
        ],
    },
];

const withDocStatuses = (driver: DriverProfile): DriverProfile => ({
    ...driver,
    documents: driver.documents.map((document) => ({
        ...document,
        status: computeDocumentStatus(document.expiryDate),
    })),
});

export const getDrivers = () => driversStore.map(withDocStatuses);

export const getDriverById = (id: string) => {
    const driver = driversStore.find((item) => item.id === id);
    return driver ? withDocStatuses(driver) : null;
};

export const getDriverStatusLabel = (status: DriverStatus) => {
    const labels: Record<DriverStatus, string> = {
        available: 'متاح',
        'in-trip': 'في رحلة',
        'on-leave': 'في إجازة',
        suspended: 'موقوف',
    };

    return labels[status];
};

export const getDocumentStatusLabel = (status: 'valid' | 'expiring' | 'expired') => {
    const labels = {
        valid: 'سارية',
        expiring: 'قريبة الانتهاء',
        expired: 'منتهية',
    };

    return labels[status];
};

export const getTripStatusLabel = (status: 'completed' | 'in-transit' | 'canceled') => {
    const labels = {
        completed: 'منجزة',
        'in-transit': 'في الطريق',
        canceled: 'ملغاة',
    };

    return labels[status];
};