type DebounceFunction = (...args: any) => void;

export default function debounce(callback: DebounceFunction, time: number): DebounceFunction {
    let interval: number;
    return (...args): void => {
        window.clearTimeout(interval);
        interval = window.setTimeout((): void => {
            interval = 0;
            callback(...args);
        }, time);
    };
}
