import { Expense, ExpenseType, Invoice, InvoiceStatus, ProfitLossPoint } from '../types/finance';

const invoicesStore: Invoice[] = [
    { id: 'INV-2401', clientId: 'cl-1', clientName: 'شركة الواحة للتغليف', amount: 85000, issueDate: '02/03/2026', status: 'pending' },
    { id: 'INV-2402', clientId: 'cl-2', clientName: 'مجمع الريان الصناعي', amount: 92000, issueDate: '02/03/2026', status: 'paid' },
    { id: 'INV-2403', clientId: 'cl-3', clientName: 'مؤسسة الشرق للمواد الغذائية', amount: 98000, issueDate: '01/03/2026', status: 'overdue' },
    { id: 'INV-2404', clientId: 'cl-1', clientName: 'شركة الواحة للتغليف', amount: 132000, issueDate: '22/02/2026', status: 'paid' },
    { id: 'INV-2405', clientId: 'cl-2', clientName: 'مجمع الريان الصناعي', amount: 104000, issueDate: '18/02/2026', status: 'pending' },
];

let expensesStore: Expense[] = [
    { id: 'EXP-101', type: 'وقود', amount: 54000, date: '02/03/2026', description: 'ديزل لثلاث شاحنات', linkedTo: 'veh-1' },
    { id: 'EXP-102', type: 'صيانة', amount: 87000, date: '27/02/2026', description: 'إصلاح نظام التبريد', linkedTo: 'veh-3' },
    { id: 'EXP-103', type: 'رواتب', amount: 293000, date: '26/02/2026', description: 'رواتب أسبوعية للسائقين' },
    { id: 'EXP-104', type: 'رسوم', amount: 18000, date: '24/02/2026', description: 'رسوم طريق سريع', linkedTo: 'TR-2391' },
];

const profitLossSeries: ProfitLossPoint[] = [
    { period: 'أكتوبر', revenue: 7800000, expenses: 4200000 },
    { period: 'نوفمبر', revenue: 8600000, expenses: 4400000 },
    { period: 'ديسمبر', revenue: 9200000, expenses: 4700000 },
    { period: 'يناير', revenue: 10100000, expenses: 5200000 },
    { period: 'فيفري', revenue: 11200000, expenses: 5900000 },
    { period: 'مارس', revenue: 12400000, expenses: 6400000 },
];

export const getInvoices = () => [...invoicesStore];

export const getInvoiceStatusLabel = (status: InvoiceStatus) => {
    const labels: Record<InvoiceStatus, string> = {
        paid: 'مدفوع',
        pending: 'معلق',
        overdue: 'متأخر',
    };

    return labels[status];
};

export const getExpenses = () => [...expensesStore].sort((a, b) => (a.date < b.date ? 1 : -1));

export const addExpense = (payload: Omit<Expense, 'id'>) => {
    const item: Expense = {
        ...payload,
        id: `EXP-${100 + expensesStore.length + 1}`,
    };

    expensesStore = [item, ...expensesStore];
    return item;
};

export const getExpenseTypeOptions = (): ExpenseType[] => ['وقود', 'صيانة', 'رواتب', 'رسوم', 'أخرى'];

export const getProfitLossSeries = () => [...profitLossSeries];
