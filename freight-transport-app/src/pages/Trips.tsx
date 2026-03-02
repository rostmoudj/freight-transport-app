import {
    ColumnDef,
    PaginationState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Download, FileSpreadsheet, FileText, Filter, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDrivers, getTripsByFilters, getVehicles } from '../services/tripService';
import { Trip, TripFilters, TripStatus } from '../types/trip';

const statusLabelMap: Record<TripStatus, string> = {
    scheduled: 'مجدولة',
    'in-transit': 'في الطريق',
    completed: 'منجزة',
    canceled: 'ملغاة',
    delayed: 'متأخرة',
};

const statusClassMap: Record<TripStatus, string> = {
    scheduled: 'status scheduled',
    'in-transit': 'status transit',
    completed: 'status completed',
    canceled: 'status canceled',
    delayed: 'status delayed',
};

const moneyFormatter = new Intl.NumberFormat('fr-DZ');

const defaultFilters: TripFilters = {
    search: '',
    date: '',
    status: 'all',
    driver: '',
    vehicle: '',
};

const Trips = () => {
    const [filters, setFilters] = useState<TripFilters>(defaultFilters);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 8,
    });
    const drivers = getDrivers();
    const vehicles = getVehicles();

    const filteredTrips = useMemo(() => getTripsByFilters(filters), [filters]);

    useEffect(() => {
        setPagination((previous) => ({ ...previous, pageIndex: 0 }));
    }, [filters]);

    const columns = useMemo<ColumnDef<Trip>[]>(
        () => [
            {
                header: 'رقم الرحلة',
                accessorKey: 'id',
                cell: ({ row }) => <Link to={`/trips/${row.original.id}`}>{row.original.id}</Link>,
            },
            { header: 'التاريخ', accessorKey: 'date' },
            { header: 'السائق', accessorKey: 'driver' },
            { header: 'المركبة', accessorKey: 'vehicle' },
            { header: 'الانطلاق', accessorKey: 'origin' },
            { header: 'الوجهة', accessorKey: 'destination' },
            {
                header: 'الحمولة',
                cell: ({ row }) => `${row.original.cargoType} (${row.original.weightTons} طن)`,
            },
            {
                header: 'الحالة',
                cell: ({ row }) => (
                    <span className={statusClassMap[row.original.status]}>{statusLabelMap[row.original.status]}</span>
                ),
            },
            {
                header: 'التكلفة',
                cell: ({ row }) => `${moneyFormatter.format(row.original.cost)} دج`,
            },
        ],
        []
    );

    const table = useReactTable({
        data: filteredTrips,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        autoResetPageIndex: true,
    });

    const exportToExcel = async () => {
        const XLSX = await import('xlsx');
        const data = filteredTrips.map((trip) => ({
            'رقم الرحلة': trip.id,
            التاريخ: trip.date,
            العميل: trip.client,
            السائق: trip.driver,
            المركبة: trip.vehicle,
            الانطلاق: trip.origin,
            الوجهة: trip.destination,
            الحمولة: trip.cargoType,
            'الوزن (طن)': trip.weightTons,
            الحالة: statusLabelMap[trip.status],
            'التكلفة (دج)': trip.cost,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Trips');
        XLSX.writeFile(workbook, 'trips-report.xlsx');
    };

    const exportToPdf = async () => {
        const { default: jsPDF } = await import('jspdf');
        const { default: autoTable } = await import('jspdf-autotable');
        const doc = new jsPDF({ orientation: 'landscape' });
        doc.setFontSize(14);
        doc.text('Trips Report', 14, 12);

        autoTable(doc, {
            head: [['Trip ID', 'Date', 'Driver', 'Vehicle', 'Origin', 'Destination', 'Cargo', 'Status', 'Cost DZD']],
            body: filteredTrips.map((trip) => [
                trip.id,
                trip.date,
                trip.driver,
                trip.vehicle,
                trip.origin,
                trip.destination,
                `${trip.cargoType} (${trip.weightTons}T)`,
                statusLabelMap[trip.status],
                moneyFormatter.format(trip.cost),
            ]),
            startY: 18,
            styles: { fontSize: 8 },
        });

        doc.save('trips-report.pdf');
    };

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <div className="trips-head">
                    <div>
                        <h2 className="panel-title">إدارة الرحلات</h2>
                        <p className="panel-subtitle">فلترة فورية + بحث نصي + تصدير PDF/Excel</p>
                    </div>

                    <div className="trips-actions">
                        <button className="icon-btn" onClick={exportToExcel} title="تصدير Excel">
                            <FileSpreadsheet size={18} />
                        </button>
                        <button className="icon-btn" onClick={exportToPdf} title="تصدير PDF">
                            <FileText size={18} />
                        </button>
                        <Link className="primary-btn" to="/trips/new">
                            <Plus size={16} />
                            <span>رحلة جديدة</span>
                        </Link>
                    </div>
                </div>

                <div className="trips-filters">
                    <label className="filter-field">
                        <Filter size={16} />
                        <input
                            type="text"
                            placeholder="بحث: رقم الرحلة، السائق، المركبة، العميل..."
                            value={filters.search}
                            onChange={(event) =>
                                setFilters((previous) => ({ ...previous, search: event.target.value }))
                            }
                        />
                    </label>

                    <input
                        type="text"
                        placeholder="التاريخ DD/MM/YYYY"
                        value={filters.date}
                        onChange={(event) => setFilters((previous) => ({ ...previous, date: event.target.value }))}
                    />

                    <select
                        aria-label="فلترة الحالة"
                        value={filters.status}
                        onChange={(event) =>
                            setFilters((previous) => ({
                                ...previous,
                                status: event.target.value as TripStatus | 'all',
                            }))
                        }
                    >
                        <option value="all">كل الحالات</option>
                        <option value="scheduled">مجدولة</option>
                        <option value="in-transit">في الطريق</option>
                        <option value="completed">منجزة</option>
                        <option value="canceled">ملغاة</option>
                        <option value="delayed">متأخرة</option>
                    </select>

                    <select
                        aria-label="فلترة السائق"
                        value={filters.driver}
                        onChange={(event) => setFilters((previous) => ({ ...previous, driver: event.target.value }))}
                    >
                        <option value="">كل السائقين</option>
                        {drivers.map((driver) => (
                            <option key={driver.id} value={driver.name}>
                                {driver.name}
                            </option>
                        ))}
                    </select>

                    <select
                        aria-label="فلترة المركبة"
                        value={filters.vehicle}
                        onChange={(event) => setFilters((previous) => ({ ...previous, vehicle: event.target.value }))}
                    >
                        <option value="">كل المركبات</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.plate}>
                                {vehicle.plate}
                            </option>
                        ))}
                    </select>

                    <button className="ghost-btn" onClick={() => setFilters(defaultFilters)}>
                        <Download size={15} />
                        إعادة ضبط
                    </button>
                </div>
            </div>

            <div className="panel fade-in-up">
                <div className="table-scroll">
                    <table className="dashboard-table">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} data-label={String(cell.column.columnDef.header ?? '')}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {table.getRowModel().rows.length === 0 && (
                                <tr>
                                    <td colSpan={9}>لا توجد رحلات مطابقة للبحث الحالي</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="pagination-row">
                    <div className="pagination-controls">
                        <button className="ghost-btn" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            السابق
                        </button>
                        <span>
                            صفحة {table.getState().pagination.pageIndex + 1} من {table.getPageCount() || 1}
                        </span>
                        <button className="ghost-btn" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            التالي
                        </button>
                    </div>

                    <select
                        aria-label="عدد الصفوف لكل صفحة"
                        value={pagination.pageSize}
                        onChange={(event) =>
                            setPagination({
                                pageIndex: 0,
                                pageSize: Number(event.target.value),
                            })
                        }
                    >
                        <option value={5}>5 / صفحة</option>
                        <option value={8}>8 / صفحة</option>
                        <option value={10}>10 / صفحة</option>
                    </select>
                </div>
            </div>
        </section>
    );
};

export default Trips;