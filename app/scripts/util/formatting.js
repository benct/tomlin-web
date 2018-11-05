import dateFormat from 'date-fns/format';

export function formatDate(date, format = 'MMM do, YYY') {
    return date && date !== '' ? dateFormat(date, format) : null;
}

export function formatDuration(minutes) {
    if (typeof minutes !== 'number' || isNaN(minutes) || minutes <= 0) {
        return '-';
    }
    return minutes < 60 ? `${minutes % 60} min` : `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
}

export function formatThousands(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatYears(type, start, end) {
    if (!start) {
        return 'Unknown';
    }
    return type === 'tv' ? `${start}${end ? '-' + end : String.fromCharCode(8594)}` : start;
}

export function formatGradientHSL(count, total) {
    return `hsl(${Math.ceil((total > 0 ? count / total : 0) * 120)}, 1000%, 30%)`;
}
