import React from 'react';

interface StarIconProps {
    width: number;
    height?: number;
    favourite?: boolean;
}

export const StarIcon: React.FC<StarIconProps> = ({ width, height, favourite }): React.ReactElement => (
    <svg width={width} height={height} className="color-base" viewBox="0 0 512 512">
        <polygon
            fill={favourite ? '#fad000' : 'transparent'}
            points="461.6,214.8 304,214.8 255.2,62.8 206.4,214.8 48.8,214.8 176.8,307.6 128,458.8 256,365.2
                    384,458.8 333.6,307.6 "
        />
        <path
            d="M512,198H316.8L256,10.8L195.2,198H0l157.6,115.2L96.8,500.4L256,385.2l158.4,116L353.6,314L512,198z M256,365.2l-128,93.6
                l48.8-151.2l-128-92.8h157.6l48.8-152l48.8,152h157.6l-128,92.8L384,458.8L256,365.2z"
        />
    </svg>
);

interface ViewIconProps {
    width: number;
    height?: number;
    seen?: boolean;
}

export const ViewIcon: React.FC<ViewIconProps> = ({ width, height, seen }): React.ReactElement => (
    <svg width={width} height={height} className="color-base" viewBox="0 0 512 480">
        <path
            fill={seen ? '#edebec' : 'transparent'}
            d="M256,127.749c-100.027,0-189.405,49.922-248.485,128.25C66.595,334.329,155.973,384.25,256,384.25
                    S445.404,334.329,504.485,256C445.404,177.671,356.026,127.749,256,127.749z"
        />
        <circle fill={seen ? '#55d3fA' : 'transparent'} cx="256" cy="256" r="112.219" />
        <circle fill={seen ? '#614a50' : 'transparent'} cx="256" cy="256" r="40.078" />
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
