import { AppNotification } from '../types/notification';

const notifications: AppNotification[] = [
    {
        id: 'n1',
        title: 'اقتراب انتهاء وثيقة مركبة',
        message: 'المركبة 734-125-16: رخصة السير تنتهي خلال 18 يوماً.',
        date: '02/03/2026',
        type: 'vehicle-doc',
        read: false,
    },
    {
        id: 'n2',
        title: 'اقتراب انتهاء رخصة سائق',
        message: 'رخصة السائق رضا ماحي تنتهي خلال 23 يوماً.',
        date: '02/03/2026',
        type: 'driver-license',
        read: false,
    },
    {
        id: 'n3',
        title: 'تأخر رحلة',
        message: 'الرحلة TR-2404 متأخرة بـ 1س و40د عن الموعد المتوقع.',
        date: '01/03/2026',
        type: 'trip-delay',
        read: true,
    },
    {
        id: 'n4',
        title: 'طلب رحلة جديد',
        message: 'عميل جديد طلب رحلة من الجزائر إلى الجلفة.',
        date: '01/03/2026',
        type: 'new-request',
        read: false,
    },
];

export const getNotifications = () => [...notifications];
