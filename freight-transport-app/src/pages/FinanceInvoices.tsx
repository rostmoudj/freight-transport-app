import { FileDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getInvoices, getInvoiceStatusLabel } from '../services/financeService';
import { InvoiceStatus } from '../types/finance';

const statusClassMap: Record<InvoiceStatus, string> = {
    paid: 'status completed',
    pending: 'status transit',
    overdue: 'status canceled',
};

const FinanceInvoices = () => {
    const invoices = getInvoices();
    const [period, setPeriod] = useState('');
    const [client, setClient] = useState('');
    const [status, setStatus] = useState<InvoiceStatus | 'all'>('all');

    const clients = useMemo(() => Array.from(new Set(invoices.map((invoice) => invoice.clientName))), [invoices]);

    const filtered = useMemo(() => {
        return invoices.filter((invoice) => {
            const byPeriod = !period || invoice.issueDate.includes(period);
            const byClient = !client || invoice.clientName === client;
            const byStatus = status === 'all' || invoice.status === status;
            return byPeriod && byClient && byStatus;
        });
    }, [invoices, period, client, status]);

    const exportPdf = async () => {
        const { default: jsPDF } = await import('jspdf');
        const { default: autoTable } = await import('jspdf-autotable');
        const doc = new jsPDF({ orientation: 'landscape' });
        doc.text('Invoices Report', 14, 12);
        autoTable(doc, {
            head: [['Invoice', 'Client', 'Amount', 'Issue Date', 'Status']],
            body: filtered.map((invoice) => [
                invoice.id,
                invoice.clientName,
                new Intl.NumberFormat('fr-DZ').format(invoice.amount),
                invoice.issueDate,
                getInvoiceStatusLabel(invoice.status),
            ]),
            startY: 18,
            styles: { fontSize: 8 },
        });
        doc.save('invoices-report.pdf');
    };

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <div className="trips-head">
                    <div>
                        <h2 className="panel-title">الفواتير</h2>
                        <p className="panel-subtitle">تصفية حسب الفترة والعميل والحالة + إنشاء PDF</p>
                    </div>
                    <button className="ghost-btn" onClick={exportPdf}>
                        <FileDown size={16} />
                        إنشاء PDF
                    </button>
                </div>

                <div className="trips-filters">
                    <input
                        type="text"
                        placeholder="فلترة الفترة (مثال 03/2026)"
                        value={period}
                        onChange={(event) => setPeriod(event.target.value)}
                    />
                    <select value={client} aria-label="فلترة العميل" onChange={(event) => setClient(event.target.value)}>
                        <option value="">كل العملاء</option>
                        {clients.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <select
                        value={status}
                        aria-label="فلترة حالة الدفع"
                        onChange={(event) => setStatus(event.target.value as InvoiceStatus | 'all')}
                    >
                        <option value="all">كل الحالات</option>
                        <option value="paid">مدفوع</option>
                        <option value="pending">معلق</option>
                        <option value="overdue">متأخر</option>
                    </select>
                </div>
            </div>

            <div className="panel fade-in-up">
                <div className="table-scroll">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>رقم الفاتورة</th>
                                <th>العميل</th>
                                <th>المبلغ</th>
                                <th>تاريخ الإصدار</th>
                                <th>حالة الدفع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td data-label="رقم الفاتورة">{invoice.id}</td>
                                    <td data-label="العميل">{invoice.clientName}</td>
                                    <td data-label="المبلغ">{new Intl.NumberFormat('fr-DZ').format(invoice.amount)} دج</td>
                                    <td data-label="تاريخ الإصدار">{invoice.issueDate}</td>
                                    <td data-label="حالة الدفع">
                                        <span className={statusClassMap[invoice.status]}>{getInvoiceStatusLabel(invoice.status)}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default FinanceInvoices;
