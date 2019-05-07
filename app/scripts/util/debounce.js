export default function debounce(callback, time) {
    let interval;
    return (...args) => {
        window.clearTimeout(interval);
        interval = window.setTimeout(() => {
            interval = null;
            callback(...args);
        }, time);
    };
}
