import { FileSpreadsheet, FileText } from 'lucide-react';
import { getReports } from '../services/reportService';

const Reports = () => {
    const reports = getReports();

    const exportPdf = async (title: string, rows: Array<Record<string, string | number>>) => {
        const { default: jsPDF } = await import('jspdf');
        const { default: autoTable } = await import('jspdf-autotable');
        const doc = new jsPDF({ orientation: 'landscape' });
        doc.text(title, 14, 12);
        const head = [Object.keys(rows[0] || { البيانات: '' })];
        const body = rows.map((row) => Object.values(row));
        autoTable(doc, { head, body, startY: 18, styles: { fontSize: 8 } });
        doc.save(`${title}.pdf`);
    };

    const exportExcel = async (title: string, rows: Array<Record<string, string | number>>) => {
        const XLSX = await import('xlsx');
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Report');
        XLSX.writeFile(wb, `${title}.xlsx`);
    };

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <h2 className="panel-title">التقارير</h2>
                <p className="panel-subtitle">تصدير PDF و Excel لكل تقرير تشغيلي</p>
            </div>

            <div className="reports-grid">
                {reports.map((report) => (
                    <article className="panel fade-in-up" key={report.id}>
                        <h3>{report.title}</h3>
                        <p className="panel-subtitle">{report.description}</p>
                        <p className="panel-subtitle">الفترة: {report.period === 'daily' ? 'يومي' : report.period === 'weekly' ? 'أسبوعي' : 'شهري'}</p>
                        <div className="trips-actions">
                            <button className="ghost-btn" onClick={() => exportPdf(report.title, report.rows)}>
                                <FileText size={16} />
                                تصدير PDF
                            </button>
                            <button className="ghost-btn" onClick={() => exportExcel(report.title, report.rows)}>
                                <FileSpreadsheet size={16} />
                                تصدير Excel
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Reports;
