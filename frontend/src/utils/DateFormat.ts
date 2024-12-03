import dayjs, { Dayjs } from 'dayjs';
export function formatDateTime(date: Dayjs | Date | string): string {
    return dayjs(date).format('MM-DD-YYYY hh:mm A');
}
