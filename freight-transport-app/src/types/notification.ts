export type NotificationType = 'vehicle-doc' | 'driver-license' | 'trip-delay' | 'new-request';

export interface AppNotification {
    id: string;
    title: string;
    message: string;
    date: string;
    type: NotificationType;
    read: boolean;
}
