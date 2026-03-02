import { ClientCategory, ClientProfile } from '../types/client';

const clientsStore: ClientProfile[] = [
    {
        id: 'cl-1',
        name: 'شركة الواحة للتغليف',
        phone: '021 77 88 11',
        email: 'contact@oasis-pack.dz',
        address: 'الجزائر العاصمة',
        category: 'vip',
        totalPaid: 1850000,
        totalOutstanding: 260000,
        notes: 'يفضّل تسليم صباحي قبل 10:00',
        trips: [
            { tripId: 'TR-2401', date: '02/03/2026', route: 'الجزائر ← سطيف', amount: 85000, status: 'in-transit' },
            { tripId: 'TR-2409', date: '26/02/2026', route: 'المدية ← الجلفة', amount: 64000, status: 'completed' },
            { tripId: 'TR-2384', date: '22/02/2026', route: 'الجزائر ← عنابة', amount: 132000, status: 'completed' },
        ],
    },
    {
        id: 'cl-2',
        name: 'مجمع الريان الصناعي',
        phone: '041 56 72 10',
        email: 'ops@rayane-group.dz',
        address: 'وهران',
        category: 'enterprise',
        totalPaid: 2940000,
        totalOutstanding: 410000,
        notes: 'تحميل يتطلب شاحنة مجهزة بأحزمة تثبيت',
        trips: [
            { tripId: 'TR-2402', date: '02/03/2026', route: 'وهران ← تلمسان', amount: 92000, status: 'completed' },
            { tripId: 'TR-2407', date: '27/02/2026', route: 'سيدي بلعباس ← مستغانم', amount: 79000, status: 'in-transit' },
            { tripId: 'TR-2380', date: '18/02/2026', route: 'مستغانم ← الجزائر', amount: 104000, status: 'completed' },
        ],
    },
    {
        id: 'cl-3',
        name: 'مؤسسة الشرق للمواد الغذائية',
        phone: '031 88 54 92',
        email: 'log@east-foods.dz',
        address: 'قسنطينة',
        category: 'standard',
        totalPaid: 1230000,
        totalOutstanding: 730000,
        notes: 'طلب متكرر على خط عنابة - قسنطينة',
        trips: [
            { tripId: 'TR-2404', date: '01/03/2026', route: 'عنابة ← قسنطينة', amount: 98000, status: 'canceled' },
            { tripId: 'TR-2389', date: '24/02/2026', route: 'جيجل ← قسنطينة', amount: 57000, status: 'completed' },
            { tripId: 'TR-2376', date: '16/02/2026', route: 'باتنة ← قسنطينة', amount: 49000, status: 'completed' },
        ],
    },
];

export const getClientCategoryLabel = (category: ClientCategory) => {
    const labels: Record<ClientCategory, string> = {
        standard: 'عادي',
        vip: 'VIP',
        enterprise: 'مؤسسة',
    };

    return labels[category];
};

export const getClients = () => [...clientsStore];

export const getClientById = (id: string) => clientsStore.find((item) => item.id === id) ?? null;
