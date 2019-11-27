import React from 'react';
import Icon from '@mdi/react';
import { mdiEyeCheckOutline, mdiEyeOffOutline, mdiStar, mdiStarOutline } from '@mdi/js';

interface FavouriteIconProps {
    favourite: boolean;
    setFavourite: () => void;
    size?: string | number;
    className?: string;
}

export const FavouriteIcon: React.FC<FavouriteIconProps> = ({ favourite, setFavourite, size, className, ...props }): React.ReactElement => (
    <button
        className={`button-blank ${className || ''}`}
        data-tooltip={favourite ? 'Favourite' : 'Set favourite'}
        onClick={setFavourite}
        {...props}>
        <Icon
            path={favourite ? mdiStar : mdiStarOutline}
            size={size || '24px'}
            title={favourite ? 'Favourite' : 'Set favourite'}
            color="#fad000"
        />
    </button>
);

interface SeenIconProps {
    seen: boolean;
    setSeen: () => void;
    size?: string | number;
    className?: string;
}

export const SeenIcon: React.FC<SeenIconProps> = ({ seen, setSeen, size, className, ...props }): React.ReactElement => (
    <button className={`button-blank ${className || ''}`} data-tooltip={seen ? 'Seen' : 'Set seen'} onClick={setSeen} {...props}>
        <Icon
            path={seen ? mdiEyeCheckOutline : mdiEyeOffOutline}
            size={size || '24px'}
            title={seen ? 'Seen' : 'Set seen'}
            className={seen ? 'color-success' : 'color-warn'}
        />
    </button>
);