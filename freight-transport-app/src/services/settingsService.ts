import { CompanySettings, PricingSettings, UserPermission } from '../types/settings';

export const defaultCompanySettings: CompanySettings = {
    companyName: 'TRANS SYSTEM',
    phone: '021 44 55 66',
    address: 'المنطقة الصناعية، الجزائر',
    logoUrl: '',
};

export const defaultPricingSettings: PricingSettings = {
    standardRatePerKm: 120,
    coldChainRatePerKm: 170,
    heavyLoadRatePerKm: 210,
};

export const userPermissions: UserPermission[] = [
    { role: 'مدير عام', permissions: ['إدارة كاملة', 'إعدادات', 'تقارير'] },
    { role: 'مدير عمليات', permissions: ['رحلات', 'أسطول', 'سائقون', 'فواتير'] },
    { role: 'سائق', permissions: ['عرض الرحلات المكلف بها'] },
    { role: 'عميل', permissions: ['عرض طلباته وفواتيره'] },
];

export const buildBackupPayload = (company: CompanySettings, pricing: PricingSettings) => {
    return {
        exportedAt: new Date().toISOString(),
        company,
        pricing,
        roles: userPermissions,
    };
};
