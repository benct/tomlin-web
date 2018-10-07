import React from 'react';
import PropTypes from 'prop-types';

export function MenuIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" enableBackground="new 0 0 56 56" width="30" height="30">
            <path
                d="M28,0C12.561,0,0,12.561,0,28s12.561,28,28,28s28-12.561,28-28S43.439,0,28,0z M28,54C13.663,54,2,42.336,2,28
		            S13.663,2,28,2s26,11.664,26,26S42.337,54,28,54z"
            />
            <path d="M40,16H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,16,40,16z" />
            <path d="M40,27H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,27,40,27z" />
            <path d="M40,38H16c-0.553,0-1,0.448-1,1s0.447,1,1,1h24c0.553,0,1-0.448,1-1S40.553,38,40,38z" />
        </svg>
    );
}

export function CloseIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" width="28" height="28">
            <path
                d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
                    S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"
                fill="#FFFFFF"
            />
            <path
                d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0
                    s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36
                    s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293
                    c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z"
                fill="#FFFFFF"
            />
        </svg>
    );
}

export function PlusIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.444 31.444" enableBackground="new 0 0 31.444 31.444">
            <path
                d="M1.119,16.841c-0.619,0-1.111-0.508-1.111-1.127c0-0.619,0.492-1.111,1.111-1.111h13.475V1.127
                    C14.595,0.508,15.103,0,15.722,0c0.619,0,1.111,0.508,1.111,1.127v13.476h13.475c0.619,0,1.127,0.492,1.127,1.111
                    c0,0.619-0.508,1.127-1.127,1.127H16.833v13.476c0,0.619-0.492,1.127-1.111,1.127c-0.619,0-1.127-0.508-1.127-1.127V16.841H1.119z"
            />
        </svg>
    );
}

export function ArrowIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enableBackground="new 0 0 129 129" width="30" height="30">
            <path
                d="m64.5,122.6c32,0 58.1-26 58.1-58.1s-26-58-58.1-58-58,26-58,58 26,58.1 58,58.1zm0-108c27.5,5.32907e-15
                    49.9,22.4 49.9,49.9s-22.4,49.9-49.9,49.9-49.9-22.4-49.9-49.9 22.4-49.9 49.9-49.9z"
            />
            <path
                d="m70,93.5c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2 1.6-1.6 1.6-4.2 0-5.8l-23.5-23.5 23.5-23.5c1.6-1.6
                    1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-26.4,26.4c-0.8,0.8-1.2,1.8-1.2,2.9s0.4,2.1 1.2,2.9l26.4,26.4z"
            />
        </svg>
    );
}

export function RefreshIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 489.711 489.711" width="28" height="28">
            <path
                d="M112.156,97.111c72.3-65.4,180.5-66.4,253.8-6.7l-58.1,2.2c-7.5,0.3-13.3,6.5-13,14c0.3,7.3,6.3,13,13.5,13
                    c0.2,0,0.3,0,0.5,0l89.2-3.3c7.3-0.3,13-6.2,13-13.5v-1c0-0.2,0-0.3,0-0.5v-0.1l0,0l-3.3-88.2c-0.3-7.5-6.6-13.3-14-13
                    c-7.5,0.3-13.3,6.5-13,14l2.1,55.3c-36.3-29.7-81-46.9-128.8-49.3c-59.2-3-116.1,17.3-160,57.1c-60.4,54.7-86,137.9-66.8,217.1
                    c1.5,6.2,7,10.3,13.1,10.3c1.1,0,2.1-0.1,3.2-0.4c7.2-1.8,11.7-9.1,9.9-16.3C36.656,218.211,59.056,145.111,112.156,97.111z"
            />
            <path
                d="M462.456,195.511c-1.8-7.2-9.1-11.7-16.3-9.9c-7.2,1.8-11.7,9.1-9.9,16.3c16.9,69.6-5.6,142.7-58.7,190.7
                    c-37.3,33.7-84.1,50.3-130.7,50.3c-44.5,0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-0.7,12.9-7.2,12.2-14.7s-7.2-12.9-14.7-12.2l-88.9,8
                    c-7.4,0.7-12.9,7.2-12.2,14.7l8,88.9c0.6,7,6.5,12.3,13.4,12.3c0.4,0,0.8,0,1.2-0.1c7.4-0.7,12.9-7.2,12.2-14.7l-4.8-54.1
                    c36.3,29.4,80.8,46.5,128.3,48.9c3.8,0.2,7.6,0.3,11.3,0.3c55.1,0,107.5-20.2,148.7-57.4
                    C456.056,357.911,481.656,274.811,462.456,195.511z"
            />
        </svg>
    );
}

export function UploadIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
            <path
                d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8
                    2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6
                    0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
            />
        </svg>
    );
}

export function ParentDirIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 129 129" width="28" height="28">
            <path
                d="m121.4,61.6l-54-54c-0.7-0.7-1.8-1.2-2.9-1.2s-2.2,0.5-2.9,1.2l-54,54c-1.6,1.6-1.6,4.2 0,5.8 0.8,0.8
                    1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2l47-47v98.1c0,2.3 1.8,4.1 4.1,4.1s4.1-1.8 4.1-4.1v-98.1l47,47c1.6,1.6 4.2,1.6
                    5.8,0s1.5-4.2 1.42109e-14-5.8z"
                fill="#FFFFFF"
            />
        </svg>
    );
}

export function NewDirIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 476.737 476.737" width="28" height="28">
            <path
                d="M444.955,31.782H333.208c-17.576,0-37.758,8.931-47.165,31.782c0,0-4.132,29.145-31.782,31.782
                    H31.782C14.239,95.347,0,109.077,0,126.621v286.551c0,17.544,14.239,31.783,31.782,31.783h413.172
                    c17.544,0,31.782-14.239,31.782-31.783V63.565C476.737,46.021,462.499,31.782,444.955,31.782z M444.955,126.621v286.551H31.782
                    V127.13H254.26l3.051-0.159c29.812-2.829,48.246-23.71,56.732-45.163c8.263-20.722,22.661-18.243,22.661-18.243h108.251V126.621 z"
                fill="#FFFFFF"
            />
            <path
                d="M317.825,254.26H254.26v-63.565c0-8.772-7.151-15.891-15.891-15.891
                    c-8.772,0-15.891,7.119-15.891,15.891v63.565h-63.565c-8.772,0-15.891,7.151-15.891,15.891s7.119,15.891,15.891,15.891h63.565
                    v63.565c0,8.74,7.119,15.891,15.891,15.891c8.74,0,15.891-7.151,15.891-15.891v-63.565h63.565
                    c8.74,0,15.891-7.151,15.891-15.891S326.565,254.26,317.825,254.26z"
                fill="#FFFFFF"
            />
        </svg>
    );
}

export function StarIcon({ width, height, favourite }) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
            <polygon
                fill={favourite ? '#FAD000' : '#FFFFFF'}
                points="461.6,214.8 304,214.8 255.2,62.8 206.4,214.8 48.8,214.8 176.8,307.6 128,458.8 256,365.2
                    384,458.8 333.6,307.6 "
            />
            <path
                d="M512,198H316.8L256,10.8L195.2,198H0l157.6,115.2L96.8,500.4L256,385.2l158.4,116L353.6,314L512,198z M256,365.2l-128,93.6
                    l48.8-151.2l-128-92.8h157.6l48.8-152l48.8,152h157.6l-128,92.8L384,458.8L256,365.2z"
            />
        </svg>
    );
}

StarIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number,
    favourite: PropTypes.bool,
};

export function ViewIcon({ width, height, seen }) {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 480" enableBackground="new 0 0 512 480">
            <path
                fill={seen ? '#EDEBEC' : '#FFFFFF'}
                d="M256,127.749c-100.027,0-189.405,49.922-248.485,128.25C66.595,334.329,155.973,384.25,256,384.25
                    S445.404,334.329,504.485,256C445.404,177.671,356.026,127.749,256,127.749z"
            />
            <circle fill={seen ? '#55D3FA' : '#FFFFFF'} cx="256" cy="256" r="112.219" />
            <circle fill={seen ? '#614A50' : '#FFFFFF'} cx="256" cy="256" r="40.078" />
            <path
                d="M510.484,251.474C447.574,168.069,354.819,120.235,256,120.235S64.425,168.07,1.515,251.474c-2.02,2.679-2.02,6.371,0,9.051
                    C64.425,343.93,157.181,391.765,256,391.765s191.574-47.834,254.484-131.239C512.505,257.846,512.505,254.153,510.484,251.474z
                    M256,376.736c-92.263,0-179.064-43.928-239.014-120.736C76.936,179.192,163.737,135.264,256,135.264
                    c92.262,0,179.063,43.928,239.014,120.736C435.063,332.808,348.262,376.736,256,376.736z"
            />
            <path
                d="M334.746,175.697c-3.096,2.764-3.366,7.515-0.603,10.611c17.128,19.19,26.562,43.942,26.562,69.692
                    c0,57.734-46.971,104.704-104.704,104.704c-57.735,0-104.704-46.971-104.704-104.704S198.265,151.295,256,151.295
                    c16.904,0,33.036,3.902,47.945,11.596c3.686,1.901,8.22,0.456,10.124-3.232c1.903-3.688,0.456-8.221-3.232-10.124
                    c-16.821-8.681-35.783-13.269-54.836-13.269c-66.022,0-119.734,53.712-119.734,119.734S189.978,375.734,256,375.734
                    S375.734,322.021,375.734,256c0-29.448-10.789-57.752-30.377-79.7C342.593,173.204,337.843,172.934,334.746,175.697z"
            />
            <path
                d="M208.407,256c0,26.242,21.351,47.593,47.593,47.593c26.242,0,47.593-21.351,47.593-47.593S282.242,208.407,256,208.407
                    S208.407,229.757,208.407,256z M288.564,256c0,17.956-14.608,32.564-32.564,32.564c-17.955,0-32.564-14.608-32.564-32.564
                    s14.609-32.564,32.564-32.564C273.956,223.436,288.564,238.044,288.564,256z"
            />
        </svg>
    );
}

ViewIcon.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number,
    seen: PropTypes.bool,
};

export function ImdbIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.667 490.667" enableBackground="new 0 0 490.667 490.667">
            <path
                fill="#FFC107"
                d="M53.333,138.667h384c29.455,0,53.333,23.878,53.333,53.333v106.667
                    c0,29.455-23.878,53.333-53.333,53.333h-384C23.878,352,0,328.122,0,298.667V192C0,162.545,23.878,138.667,53.333,138.667z"
            />
            <path
                fill="#292929"
                d="M96,309.333c-5.891,0-10.667-4.776-10.667-10.667V192c0-5.891,4.776-10.667,10.667-10.667
                    c5.891,0,10.667,4.776,10.667,10.667v106.667C106.667,304.558,101.891,309.333,96,309.333z"
            />
            <path
                fill="#292929"
                d="M224,309.333c-5.891,0-10.667-4.776-10.667-10.667v-96h-1.92L191.787,300.8
                    c-1.172,5.773-6.803,9.503-12.576,8.331c-4.198-0.852-7.478-4.133-8.331-8.331l-19.627-98.133h-1.92v96
                    c0,5.891-4.776,10.667-10.667,10.667S128,304.558,128,298.667V192c0-5.891,4.776-10.667,10.667-10.667H160
                    c5.07-0.001,9.439,3.566,10.453,8.533l10.88,54.4l10.88-54.4c1.014-4.967,5.384-8.534,10.453-8.533H224
                    c5.891,0,10.667,4.776,10.667,10.667v106.667C234.667,304.558,229.891,309.333,224,309.333z"
            />
            <path
                fill="#292929"
                d="M288,309.333h-21.333c-5.891,0-10.667-4.776-10.667-10.667V192c0-5.891,4.776-10.667,10.667-10.667
                    H288c17.673,0,32,14.327,32,32v64C320,295.006,305.673,309.333,288,309.333z M277.333,288H288c5.891,0,10.667-4.776,10.667-10.667
                    v-64c0-5.891-4.776-10.667-10.667-10.667h-10.667V288z"
            />
            <path
                fill="#292929"
                d="M352,309.333c-5.891,0-10.667-4.776-10.667-10.667V192c0-5.891,4.776-10.667,10.667-10.667
                    c5.891,0,10.667,4.776,10.667,10.667v106.667C362.667,304.558,357.891,309.333,352,309.333z"
            />
            <path
                fill="#292929"
                d="M373.333,309.333c-17.673,0-32-14.327-32-32v-42.667c0-17.673,14.327-32,32-32s32,14.327,32,32
                    v42.667C405.333,295.006,391.006,309.333,373.333,309.333z M373.333,224c-5.891,0-10.667,4.776-10.667,10.667v42.667
                    c0,5.891,4.776,10.667,10.667,10.667S384,283.224,384,277.333v-42.667C384,228.776,379.224,224,373.333,224z"
            />
        </svg>
    );
}
