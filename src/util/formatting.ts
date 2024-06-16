import dateParse from 'date-fns/parseISO';
import dateFormat from 'date-fns/format';

export const formatQuery = (data: Record<string, string | number | boolean | null> = {}): string => {
    const params = Object.keys(data)
        .filter((key: string): boolean => typeof data[key] !== 'undefined' && data[key] !== null)
        .map((key: string): string => `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? '')}`);

    return params.length > 0 ? `?${params.join('&')}` : '';
};

export const formatDate = (date?: string, format = 'MMM d, YYY'): string | null => (date ? dateFormat(dateParse(date), format) : null);

export const formatTimestamp = (dateTime?: string, format = 'dd/MM/yy HH:mm:ss'): string | null =>
    dateTime ? dateFormat(dateParse(dateTime), format) : null;

export const formatDuration = (minutes: number | null): string => {
    if (typeof minutes !== 'number' || isNaN(minutes) || minutes <= 0) {
        return '-';
    }
    return minutes < 60 ? `${minutes % 60} min` : `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
};

export const formatThousands = (number: number): string => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const formatYears = (type: string, start: string | null, end?: string | null): string => {
    if (!start) {
        return 'Unknown';
    }
    return type === 'tv' && end !== start ? `${start}${end ? `-${end}` : String.fromCharCode(8594)}` : start;
};

export const formatGradientHSL = (count: number, total: number): string =>
    `hsl(${Math.ceil((total > 0 ? count / total : 0) * 120)}, 1000%, 40%)`;
