import { ClientOption, DriverOption, Trip, TripFilters, TripStatus, VehicleOption } from '../types/trip';

const mockDrivers: DriverOption[] = [
    { id: 'd1', name: 'رضا ماحي', status: 'in-trip' },
    { id: 'd2', name: 'رابح سالم', status: 'available' },
    { id: 'd3', name: 'سفيان عياش', status: 'available' },
    { id: 'd4', name: 'مراد بن حمودة', status: 'on-leave' },
    { id: 'd5', name: 'خالد دربال', status: 'in-trip' },
];

const mockVehicles: VehicleOption[] = [
    { id: 'v1', plate: '734-125-16', status: 'in-trip' },
    { id: 'v2', plate: '291-887-31', status: 'available' },
    { id: 'v3', plate: '612-553-19', status: 'available' },
    { id: 'v4', plate: '104-229-16', status: 'maintenance' },
    { id: 'v5', plate: '414-198-35', status: 'in-trip' },
];

const mockClients: ClientOption[] = [
    { id: 'c1', name: 'شركة الواحة للتغليف' },
    { id: 'c2', name: 'مجمع الريان الصناعي' },
    { id: 'c3', name: 'مؤسسة الشرق للمواد الغذائية' },
    { id: 'c4', name: 'شركة الأطلس للبناء' },
];

const initialTrips: Trip[] = [
    {
        id: 'TR-2401',
        date: '02/03/2026',
        expectedDateTime: '02/03/2026 18:00',
        client: 'شركة الواحة للتغليف',
        driver: 'رضا ماحي',
        vehicle: '734-125-16',
        origin: 'الجزائر',
        destination: 'سطيف',
        cargoType: 'مواد غذائية',
        weightTons: 18,
        status: 'in-transit',
        cost: 85000,
        notes: 'التحميل تم الساعة 09:30 صباحاً',
    },
    {
        id: 'TR-2402',
        date: '02/03/2026',
        expectedDateTime: '02/03/2026 21:30',
        client: 'مجمع الريان الصناعي',
        driver: 'رابح سالم',
        vehicle: '291-887-31',
        origin: 'وهران',
        destination: 'تلمسان',
        cargoType: 'معدات صناعية',
        weightTons: 12,
        status: 'scheduled',
        cost: 92000,
    },
    {
        id: 'TR-2403',
        date: '01/03/2026',
        expectedDateTime: '01/03/2026 15:00',
        client: 'شركة الأطلس للبناء',
        driver: 'سفيان عياش',
        vehicle: '612-553-19',
        origin: 'البليدة',
        destination: 'باتنة',
        cargoType: 'منتجات بلاستيكية',
        weightTons: 9,
        status: 'completed',
        cost: 110000,
    },
    {
        id: 'TR-2404',
        date: '01/03/2026',
        expectedDateTime: '01/03/2026 17:00',
        client: 'مؤسسة الشرق للمواد الغذائية',
        driver: 'مراد بن حمودة',
        vehicle: '104-229-16',
        origin: 'عنابة',
        destination: 'قسنطينة',
        cargoType: 'مواد كيميائية',
        weightTons: 14,
        status: 'delayed',
        cost: 98000,
        notes: 'تأخر بسبب اكتظاظ مروري شديد',
    },
    {
        id: 'TR-2405',
        date: '28/02/2026',
        expectedDateTime: '28/02/2026 12:00',
        client: 'شركة الواحة للتغليف',
        driver: 'خالد دربال',
        vehicle: '414-198-35',
        origin: 'بجاية',
        destination: 'الجزائر',
        cargoType: 'ألمنيوم',
        weightTons: 20,
        status: 'canceled',
        cost: 73000,
        notes: 'إلغاء بطلب العميل',
    },
    {
        id: 'TR-2406',
        date: '27/02/2026',
        expectedDateTime: '27/02/2026 13:00',
        client: 'شركة الأطلس للبناء',
        driver: 'رابح سالم',
        vehicle: '291-887-31',
        origin: 'الشلف',
        destination: 'تيبازة',
        cargoType: 'أثاث',
        weightTons: 10,
        status: 'completed',
        cost: 66000,
    },
    {
        id: 'TR-2407',
        date: '27/02/2026',
        expectedDateTime: '27/02/2026 20:00',
        client: 'مجمع الريان الصناعي',
        driver: 'خالد دربال',
        vehicle: '414-198-35',
        origin: 'سيدي بلعباس',
        destination: 'مستغانم',
        cargoType: 'أجهزة كهرومنزلية',
        weightTons: 16,
        status: 'in-transit',
        cost: 79000,
    },
    {
        id: 'TR-2408',
        date: '26/02/2026',
        expectedDateTime: '26/02/2026 16:45',
        client: 'مؤسسة الشرق للمواد الغذائية',
        driver: 'سفيان عياش',
        vehicle: '612-553-19',
        origin: 'أدرار',
        destination: 'غرداية',
        cargoType: 'مواد بناء',
        weightTons: 22,
        status: 'in-transit',
        cost: 142000,
    },
    {
        id: 'TR-2409',
        date: '26/02/2026',
        expectedDateTime: '26/02/2026 10:30',
        client: 'شركة الواحة للتغليف',
        driver: 'رضا ماحي',
        vehicle: '734-125-16',
        origin: 'المدية',
        destination: 'الجلفة',
        cargoType: 'منتجات فلاحية',
        weightTons: 11,
        status: 'scheduled',
        cost: 64000,
    },
    {
        id: 'TR-2410',
        date: '25/02/2026',
        expectedDateTime: '25/02/2026 14:20',
        client: 'شركة الأطلس للبناء',
        driver: 'رابح سالم',
        vehicle: '291-887-31',
        origin: 'تيزي وزو',
        destination: 'جيجل',
        cargoType: 'مواد تغليف',
        weightTons: 8,
        status: 'completed',
        cost: 71000,
    },
];

let tripsStore = [...initialTrips];

const statusOrder: TripStatus[] = ['scheduled', 'in-transit', 'delayed', 'completed', 'canceled'];

const parseDate = (value: string) => {
    const [day, month, year] = value.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
};

export const getTrips = () => {
    return [...tripsStore].sort((a, b) => parseDate(b.date) - parseDate(a.date));
};

export const getTripsByFilters = (filters: TripFilters) => {
    const searchText = filters.search.trim().toLowerCase();

    return getTrips().filter((trip) => {
        const matchesSearch =
            !searchText ||
            [trip.id, trip.driver, trip.vehicle, trip.origin, trip.destination, trip.client, trip.cargoType]
                .join(' ')
                .toLowerCase()
                .includes(searchText);

        const matchesDate = !filters.date || trip.date === filters.date;
        const matchesStatus = filters.status === 'all' || trip.status === filters.status;
        const matchesDriver = !filters.driver || trip.driver === filters.driver;
        const matchesVehicle = !filters.vehicle || trip.vehicle === filters.vehicle;

        return matchesSearch && matchesDate && matchesStatus && matchesDriver && matchesVehicle;
    });
};

export const getTripById = (id: string) => {
    return tripsStore.find((trip) => trip.id === id) ?? null;
};

export const createTrip = (trip: Omit<Trip, 'id'>) => {
    const nextId = `TR-${2400 + tripsStore.length + 1}`;
    const newTrip: Trip = {
        ...trip,
        id: nextId,
    };

    tripsStore = [newTrip, ...tripsStore].sort((a, b) => {
        const statusA = statusOrder.indexOf(a.status);
        const statusB = statusOrder.indexOf(b.status);
        return statusA - statusB;
    });

    return newTrip;
};

export const getClients = () => mockClients;

export const getAvailableDrivers = () => mockDrivers.filter((driver) => driver.status === 'available');

export const getAvailableVehicles = () => mockVehicles.filter((vehicle) => vehicle.status === 'available');

export const getDrivers = () => mockDrivers;

export const getVehicles = () => mockVehicles;