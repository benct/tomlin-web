export function formatDuration(minutes) {
    if (typeof minutes !== 'number' || isNaN(minutes) || minutes <= 0) {
        return '-';
    }
    return minutes < 60 ? `${minutes % 60}min` : `${Math.floor(minutes / 60)}h ${minutes % 60}min`;
}
