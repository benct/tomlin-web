import { mdiEyeCheckOutline, mdiEyeOffOutline, mdiStar, mdiStarOutline } from '@mdi/js';
import { Button } from '@/components/page/Button';

interface FavouriteIconProps {
    favourite: boolean;
    setFavourite: () => void;
    size?: string | number;
    className?: string;
}

export const FavouriteIcon = ({ favourite, setFavourite, size, className }: FavouriteIconProps) => (
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

export const SeenIcon = ({ seen, setSeen, size, className }: SeenIconProps) => (
    <Button
        text={seen ? 'Seen' : 'Set seen'}
        icon={seen ? mdiEyeCheckOutline : mdiEyeOffOutline}
        className={className}
        size={size}
        onClick={setSeen}
        style={{ color: seen ? '#a3f7bf' : '#c32323' }}
    />
);
