import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Save } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { createTrip, getAvailableDrivers, getAvailableVehicles, getClients } from '../services/tripService';

const formSchema = z.object({
    client: z.string().min(1, 'اختيار العميل إجباري'),
    driver: z.string().min(1, 'اختيار السائق إجباري'),
    vehicle: z.string().min(1, 'اختيار المركبة إجباري'),
    origin: z.string().min(2, 'أدخل نقطة الانطلاق'),
    destination: z.string().min(2, 'أدخل الوجهة'),
    cargoType: z.string().min(2, 'أدخل نوع الحمولة'),
    weightTons: z.coerce.number().positive('الوزن يجب أن يكون أكبر من 0'),
    date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'الصيغة DD/MM/YYYY مطلوبة'),
    expectedTime: z.string().min(4, 'أدخل التوقيت المتوقع'),
    price: z.coerce.number().positive('السعر يجب أن يكون أكبر من 0'),
    notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const TripNew = () => {
    const navigate = useNavigate();
    const clients = useMemo(() => getClients(), []);
    const drivers = useMemo(() => getAvailableDrivers(), []);
    const vehicles = useMemo(() => getAvailableVehicles(), []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: '02/03/2026',
            expectedTime: '17:30',
        },
    });

    const onSubmit = async (values: FormValues) => {
        const created = createTrip({
            date: values.date,
            expectedDateTime: `${values.date} ${values.expectedTime}`,
            client: values.client,
            driver: values.driver,
            vehicle: values.vehicle,
            origin: values.origin,
            destination: values.destination,
            cargoType: values.cargoType,
            weightTons: values.weightTons,
            status: 'scheduled',
            cost: values.price,
            notes: values.notes,
        });

        navigate(`/trips/${created.id}`);
    };

    return (
        <section className="page-section">
            <div className="panel fade-in-up">
                <div className="trips-head">
                    <div>
                        <h2 className="panel-title">إضافة رحلة جديدة</h2>
                        <p className="panel-subtitle">اختر العميل والسائق والمركبة المتاحة ثم أكمل بيانات الحمولة والسعر</p>
                    </div>
                    <Link className="ghost-btn" to="/trips">
                        <ArrowRight size={15} />
                        العودة للقائمة
                    </Link>
                </div>

                <form className="trip-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-grid">
                        <label>
                            العميل
                            <select {...register('client')}>
                                <option value="">اختر العميل</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.name}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                            {errors.client && <small className="error-text">{errors.client.message}</small>}
                        </label>

                        <label>
                            السائق المتاح
                            <select {...register('driver')}>
                                <option value="">اختر السائق</option>
                                {drivers.map((driver) => (
                                    <option key={driver.id} value={driver.name}>
                                        {driver.name}
                                    </option>
                                ))}
                            </select>
                            {errors.driver && <small className="error-text">{errors.driver.message}</small>}
                        </label>

                        <label>
                            المركبة المتاحة
                            <select {...register('vehicle')}>
                                <option value="">اختر المركبة</option>
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.plate}>
                                        {vehicle.plate}
                                    </option>
                                ))}
                            </select>
                            {errors.vehicle && <small className="error-text">{errors.vehicle.message}</small>}
                        </label>

                        <label>
                            نقطة الانطلاق
                            <input type="text" placeholder="الجزائر" {...register('origin')} />
                            {errors.origin && <small className="error-text">{errors.origin.message}</small>}
                        </label>

                        <label>
                            الوجهة
                            <input type="text" placeholder="قسنطينة" {...register('destination')} />
                            {errors.destination && <small className="error-text">{errors.destination.message}</small>}
                        </label>

                        <label>
                            نوع الحمولة
                            <input type="text" placeholder="مواد غذائية" {...register('cargoType')} />
                            {errors.cargoType && <small className="error-text">{errors.cargoType.message}</small>}
                        </label>

                        <label>
                            الوزن (طن)
                            <input type="number" step="0.1" {...register('weightTons')} />
                            {errors.weightTons && <small className="error-text">{errors.weightTons.message}</small>}
                        </label>

                        <label>
                            التاريخ
                            <input type="text" placeholder="DD/MM/YYYY" {...register('date')} />
                            {errors.date && <small className="error-text">{errors.date.message}</small>}
                        </label>

                        <label>
                            الوقت المتوقع
                            <input type="text" placeholder="18:00" {...register('expectedTime')} />
                            {errors.expectedTime && <small className="error-text">{errors.expectedTime.message}</small>}
                        </label>

                        <label>
                            السعر المتفق عليه (دج)
                            <input type="number" step="100" {...register('price')} />
                            {errors.price && <small className="error-text">{errors.price.message}</small>}
                        </label>
                    </div>

                    <label>
                        ملاحظات إضافية
                        <textarea rows={4} placeholder="تفاصيل إضافية..." {...register('notes')} />
                    </label>

                    <button type="submit" className="primary-btn" disabled={isSubmitting}>
                        <Save size={16} />
                        {isSubmitting ? 'جاري الحفظ...' : 'حفظ الرحلة'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default TripNew;