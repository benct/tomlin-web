import dateParse from 'date-fns/parseISO';
import dateFormat from 'date-fns/format';

export function formatDate(date?: string, format: string = 'MMM do, YYY'): string | null {
    return date && date !== '' ? dateFormat(dateParse(date), format) : null;
}

export function formatDuration(minutes: number | null): string {
    if (typeof minutes !== 'number' || isNaN(minutes) || minutes <= 0) {
        return '-';
    }
    return minutes < 60 ? `${minutes % 60} min` : `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
}

export function formatThousands(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatYears(type: string, start: string | null, end?: string | null): string {
    if (!start) {
        return 'Unknown';
    }
    return type === 'tv' ? `${start}${end ? '-' + end : String.fromCharCode(8594)}` : start;
}

export function formatGradientHSL(count: number, total: number): string {
    return `hsl(${Math.ceil((total > 0 ? count / total : 0) * 120)}, 1000%, 30%)`;
}
