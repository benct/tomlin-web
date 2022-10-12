import { FC } from 'react';
import { mdiEyeCheckOutline, mdiEyeOffOutline, mdiStar, mdiStarOutline } from '@mdi/js';
import { Button } from '@/components/page/Button';

interface FavouriteIconProps {
    favourite: boolean;
    setFavourite: () => void;
    size?: string | number;
    className?: string;
}

export const FavouriteIcon: FC<FavouriteIconProps> = ({ favourite, setFavourite, size, className }) => (
    <Button
        text={favourite ? 'Favourite' : 'Set favourite'}
        icon={favourite ? mdiStar : mdiStarOutline}
        size={size}
        className={className}
        onClick={setFavourite}
        style={{ color: '#fad000' }}
    />
);

interface SeenIconProps {
    seen: boolean;
    setSeen: () => void;
    size?: string | number;
    className?: string;
}

export const SeenIcon: FC<SeenIconProps> = ({ seen, setSeen, size, className }) => (
    <Button
        text={seen ? 'Seen' : 'Set seen'}
        icon={seen ? mdiEyeCheckOutline : mdiEyeOffOutline}
        className={className}
        size={size}
        onClick={setSeen}
        style={{ color: seen ? '#a3f7bf' : '#c32323' }}
    />
);
