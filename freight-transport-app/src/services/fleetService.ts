import { FleetVehicleDetail, VehicleStatus } from '../types/fleet';

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

const vehiclesStore: FleetVehicleDetail[] = [
    {
        id: 'veh-1',
        plate: '734-125-16',
        type: 'شاحنة ثقيلة',
        model: 'Mercedes Actros',
        year: 2021,
        status: 'in-trip',
        utilizationPercent: 88,
        lastInspection: '15/01/2026',
        nextInspection: '15/03/2026',
        totalKilometers: 284500,
        trips: [
            { tripId: 'TR-2401', date: '02/03/2026', origin: 'الجزائر', destination: 'سطيف', driver: 'رضا ماحي', status: 'in-transit', cost: 85000, kilometers: 298 },
            { tripId: 'TR-2391', date: '26/02/2026', origin: 'البليدة', destination: 'بسكرة', driver: 'رضا ماحي', status: 'completed', cost: 124000, kilometers: 412 },
            { tripId: 'TR-2385', date: '23/02/2026', origin: 'الجزائر', destination: 'عنابة', driver: 'رابح سالم', status: 'completed', cost: 146000, kilometers: 535 },
        ],
        maintenance: [
            { id: 'm-101', date: '10/02/2026', type: 'صيانة دورية', cost: 42000, description: 'تغيير فلاتر وفحص منظومة الفرامل' },
            { id: 'm-102', date: '21/01/2026', type: 'زيوت', cost: 18000, description: 'تبديل زيت المحرك وعلبة السرعة' },
        ],
        documents: [
            { id: 'doc-1', label: 'رخصة السير', expiryDate: '20/03/2026', status: 'expiring' },
            { id: 'doc-2', label: 'تأمين المركبة', expiryDate: '03/07/2026', status: 'valid' },
        ],
    },
    {
        id: 'veh-2',
        plate: '291-887-31',
        type: 'شاحنة متوسطة',
        model: 'MAN TGS',
        year: 2020,
        status: 'available',
        utilizationPercent: 64,
        lastInspection: '01/02/2026',
        nextInspection: '01/05/2026',
        totalKilometers: 198200,
        trips: [
            { tripId: 'TR-2402', date: '02/03/2026', origin: 'وهران', destination: 'تلمسان', driver: 'رابح سالم', status: 'completed', cost: 92000, kilometers: 182 },
            { tripId: 'TR-2392', date: '27/02/2026', origin: 'الشلف', destination: 'تيبازة', driver: 'رابح سالم', status: 'completed', cost: 66000, kilometers: 145 },
        ],
        maintenance: [
            { id: 'm-201', date: '12/02/2026', type: 'إطارات', cost: 53000, description: 'تبديل إطارين خلفيين' },
            { id: 'm-202', date: '05/01/2026', type: 'وقود', cost: 24000, description: 'تعبئة ديزل لمسافة طويلة' },
        ],
        documents: [
            { id: 'doc-3', label: 'رخصة السير', expiryDate: '28/09/2026', status: 'valid' },
            { id: 'doc-4', label: 'تأمين المركبة', expiryDate: '11/04/2026', status: 'valid' },
        ],
    },
    {
        id: 'veh-3',
        plate: '612-553-19',
        type: 'شاحنة مبردة',
        model: 'Volvo FH',
        year: 2022,
        status: 'maintenance',
        utilizationPercent: 52,
        lastInspection: '20/01/2026',
        nextInspection: '12/03/2026',
        totalKilometers: 120600,
        trips: [
            { tripId: 'TR-2403', date: '01/03/2026', origin: 'البليدة', destination: 'باتنة', driver: 'سفيان عياش', status: 'completed', cost: 110000, kilometers: 380 },
            { tripId: 'TR-2390', date: '24/02/2026', origin: 'المدية', destination: 'وهران', driver: 'سفيان عياش', status: 'completed', cost: 133000, kilometers: 462 },
        ],
        maintenance: [
            { id: 'm-301', date: '27/02/2026', type: 'إصلاح طارئ', cost: 87000, description: 'إصلاح نظام التبريد واستبدال مضخة' },
            { id: 'm-302', date: '10/02/2026', type: 'صيانة دورية', cost: 35000, description: 'فحص شامل + تنظيف دورة التبريد' },
        ],
        documents: [
            { id: 'doc-5', label: 'رخصة السير', expiryDate: '15/03/2026', status: 'expiring' },
            { id: 'doc-6', label: 'تأمين المركبة', expiryDate: '02/03/2026', status: 'expired' },
        ],
    },
    {
        id: 'veh-4',
        plate: '104-229-16',
        type: 'شاحنة مقطورة',
        model: 'Scania R450',
        year: 2019,
        status: 'out-of-service',
        utilizationPercent: 18,
        lastInspection: '11/12/2025',
        nextInspection: '01/03/2026',
        totalKilometers: 325900,
        trips: [
            { tripId: 'TR-2404', date: '01/03/2026', origin: 'عنابة', destination: 'قسنطينة', driver: 'مراد بن حمودة', status: 'canceled', cost: 98000, kilometers: 150 },
            { tripId: 'TR-2379', date: '18/02/2026', origin: 'الجزائر', destination: 'غرداية', driver: 'مراد بن حمودة', status: 'completed', cost: 171000, kilometers: 620 },
        ],
        maintenance: [
            { id: 'm-401', date: '01/03/2026', type: 'إصلاح طارئ', cost: 123000, description: 'عطل في نظام التعليق الخلفي' },
            { id: 'm-402', date: '25/02/2026', type: 'زيوت', cost: 21000, description: 'تبديل كامل للزيوت' },
        ],
        documents: [
            { id: 'doc-7', label: 'رخصة السير', expiryDate: '01/03/2026', status: 'expired' },
            { id: 'doc-8', label: 'تأمين المركبة', expiryDate: '25/03/2026', status: 'expiring' },
        ],
    },
];

const withComputedDocumentStatus = (vehicle: FleetVehicleDetail): FleetVehicleDetail => ({
    ...vehicle,
    documents: vehicle.documents.map((document) => ({
        ...document,
        status: computeDocumentStatus(document.expiryDate),
    })),
});

export const getFleetVehicles = () => vehiclesStore.map(withComputedDocumentStatus);

export const getFleetVehicleById = (id: string) => {
    const vehicle = vehiclesStore.find((item) => item.id === id);
    return vehicle ? withComputedDocumentStatus(vehicle) : null;
};

export const getVehicleStatusLabel = (status: VehicleStatus) => {
    const labels: Record<VehicleStatus, string> = {
        available: 'متاح',
        'in-trip': 'في رحلة',
        maintenance: 'في الصيانة',
        'out-of-service': 'معطل',
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
