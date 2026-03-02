export type TripStatus = 'scheduled' | 'in-transit' | 'completed' | 'canceled' | 'delayed';

export type RecentTrip = {
    id: string;
    date: string;
    driver: string;
    vehicle: string;
    origin: string;
    destination: string;
    cargo: string;
    status: TripStatus;
    cost: number;
};

export type AlertItem = {
    id: string;
    title: string;
    dueDate: string;
    level: 'critical' | 'warning' | 'info';
};

export const dashboardStats = {
    totalTripsToday: 18,
    completedTripsMonth: 347,
    monthlyRevenue: 12400000,
    vehiclesInMaintenance: 6,
};

export const performanceSeries = [
    { month: 'أكتوبر', trips: 240, revenue: 7800000 },
    { month: 'نوفمبر', trips: 268, revenue: 8600000 },
    { month: 'ديسمبر', trips: 284, revenue: 9200000 },
    { month: 'يناير', trips: 296, revenue: 10100000 },
    { month: 'فيفري', trips: 318, revenue: 11200000 },
    { month: 'مارس', trips: 336, revenue: 12400000 },
];

export const statusDistribution = [
    { name: 'مجدولة', value: 26, key: 'scheduled' },
    { name: 'في الطريق', value: 34, key: 'in-transit' },
    { name: 'منجزة', value: 30, key: 'completed' },
    { name: 'ملغاة', value: 5, key: 'canceled' },
    { name: 'متأخرة', value: 5, key: 'delayed' },
];

export const recentTrips: RecentTrip[] = [
    {
        id: 'TR-2401',
        date: '02/03/2026',
        driver: 'رضا ماحي',
        vehicle: '734-125-16',
        origin: 'الجزائر',
        destination: 'سطيف',
        cargo: 'مواد غذائية',
        status: 'in-transit',
        cost: 85000,
    },
    {
        id: 'TR-2402',
        date: '02/03/2026',
        driver: 'رابح سالم',
        vehicle: '291-887-31',
        origin: 'وهران',
        destination: 'تلمسان',
        cargo: 'معدات صناعية',
        status: 'scheduled',
        cost: 92000,
    },
    {
        id: 'TR-2403',
        date: '01/03/2026',
        driver: 'سفيان عياش',
        vehicle: '612-553-19',
        origin: 'البليدة',
        destination: 'باتنة',
        cargo: 'منتجات بلاستيكية',
        status: 'completed',
        cost: 110000,
    },
    {
        id: 'TR-2404',
        date: '01/03/2026',
        driver: 'مراد بن حمودة',
        vehicle: '104-229-16',
        origin: 'عنابة',
        destination: 'قسنطينة',
        cargo: 'مواد كيميائية',
        status: 'delayed',
        cost: 98000,
    },
    {
        id: 'TR-2405',
        date: '28/02/2026',
        driver: 'يوسف قرمازي',
        vehicle: '881-334-09',
        origin: 'بجاية',
        destination: 'الجزائر',
        cargo: 'ألمنيوم',
        status: 'canceled',
        cost: 73000,
    },
    {
        id: 'TR-2406',
        date: '28/02/2026',
        driver: 'علي برناوي',
        vehicle: '209-005-31',
        origin: 'الشلف',
        destination: 'تيبازة',
        cargo: 'أثاث',
        status: 'completed',
        cost: 66000,
    },
    {
        id: 'TR-2407',
        date: '27/02/2026',
        driver: 'محمود ظريف',
        vehicle: '503-779-17',
        origin: 'سيدي بلعباس',
        destination: 'مستغانم',
        cargo: 'أجهزة كهرومنزلية',
        status: 'completed',
        cost: 79000,
    },
    {
        id: 'TR-2408',
        date: '27/02/2026',
        driver: 'خالد دربال',
        vehicle: '414-198-35',
        origin: 'أدرار',
        destination: 'غرداية',
        cargo: 'مواد بناء',
        status: 'in-transit',
        cost: 142000,
    },
    {
        id: 'TR-2409',
        date: '26/02/2026',
        driver: 'طارق بن ناصر',
        vehicle: '774-918-16',
        origin: 'المدية',
        destination: 'الجلفة',
        cargo: 'منتجات فلاحية',
        status: 'scheduled',
        cost: 64000,
    },
    {
        id: 'TR-2410',
        date: '26/02/2026',
        driver: 'نبيل خلوفي',
        vehicle: '128-671-25',
        origin: 'تيزي وزو',
        destination: 'جيجل',
        cargo: 'مواد تغليف',
        status: 'completed',
        cost: 71000,
    },
];

export const alerts: AlertItem[] = [
    { id: 'AL-1', title: 'انتهاء رخصة المركبة 734-125-16', dueDate: '20/03/2026', level: 'critical' },
    { id: 'AL-2', title: 'موعد صيانة دورية للمركبة 291-887-31', dueDate: '12/03/2026', level: 'warning' },
    { id: 'AL-3', title: 'السائق يوسف قرمازي في غياب غير مبرر', dueDate: '02/03/2026', level: 'info' },
];