export interface CompanySettings {
    companyName: string;
    phone: string;
    address: string;
    logoUrl?: string;
}

export interface PricingSettings {
    standardRatePerKm: number;
    coldChainRatePerKm: number;
    heavyLoadRatePerKm: number;
}

export interface UserPermission {
    role: 'مدير عام' | 'مدير عمليات' | 'سائق' | 'عميل';
    permissions: string[];
}
