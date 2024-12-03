import dayjs from 'dayjs';

export function formatDateTime(date: Date): string {
    return dayjs(date).format('DD/MM/YYYY HH:mm');
}
