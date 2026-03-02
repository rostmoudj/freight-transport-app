export type InvoiceStatus = 'paid' | 'pending' | 'overdue';

export interface Invoice {
    id: string;
    clientId: string;
    clientName: string;
    amount: number;
    issueDate: string;
    status: InvoiceStatus;
}

export type ExpenseType = 'وقود' | 'صيانة' | 'رواتب' | 'رسوم' | 'أخرى';

export interface Expense {
    id: string;
    type: ExpenseType;
    amount: number;
    date: string;
    description: string;
    linkedTo?: string;
}

export interface ProfitLossPoint {
    period: string;
    revenue: number;
    expenses: number;
}
