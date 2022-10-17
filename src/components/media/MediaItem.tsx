import { FC, ReactElement, ReactNode, useState } from 'react';
import Image from 'next/image';

import { formatDuration, formatGradientHSL, formatYears } from '@/util/formatting';

import { MediaItemEntry, MediaType } from '@/interfaces';
import { FavouriteIcon, SeenIcon } from './MediaIcons';

interface MediaItemProps {
    type: MediaType;
    data: MediaItemEntry;
    setSeen: () => void;
    setFavourite: () => void;
    showItem: () => void;
}

export const MediaItem: FC<MediaItemProps> = ({ type, data, setSeen, setFavourite, showItem }) => {
    const [src, setSrc] = useState(
        data.poster ? `https://storage.googleapis.com/tomlin-cdn/images/media${data.poster}` : '/images/media/poster.png'
    );

    const renderRating = (): ReactElement => (
        <>
            &nbsp;|&nbsp;
            <span className="font-bold">{data.rating.toFixed(1)}</span>
            <span className="text-12">/10</span>
        </>
    );

    const renderSeasons = (): ReactNode => {
        const seen = data.seen_episodes ?? 0;

        return data.number_of_episodes ? (
            <>
                <span className="text-12">Ep. </span>
                <span className="font-bold" style={{ color: formatGradientHSL(seen, data.number_of_episodes) }}>
                    {seen}
                </span>
                /{data.number_of_episodes}
            </>
        ) : null;
    };

    return (
        <div className="grid grid-cols-auto-1fr gap-16">
            <button onClick={showItem}>
                <Image
                    src={src}
                    alt={data.poster ? `Poster: ${data.title}` : 'No poster'}
                    width={40}
                    height={60}
                    placeholder="blur"
                    blurDataURL="/images/media/poster.png"
                    onError={(): void => setSrc('/images/media/poster.png')}
                />
            </button>
            <div>
                <div className="grid grid-cols-media-title gap-16">
                    <button className="text-left text-secondary dark:text-secondary-dark font-bold truncate" onClick={showItem}>
                        {data.title}
                    </button>
                    <div className="text-right whitespace-nowrap">{formatYears(type, data.release_year, data.end_year)}</div>
                </div>
                <div className="grid grid-cols-media-content items-center gap-8 text-14 mt-4">
                    {data.imdb_id ? (
                        <a href={`https://www.imdb.com/title/${data.imdb_id}`} target="_blank" rel="noreferrer external" className="h-24">
                            <Image src="/images/icon/imdb.svg" alt="IMDb" width={24} height={24} />
                        </a>
                    ) : null}
                    <span className="truncate">
                        {type === 'tv' ? renderSeasons() : formatDuration(data.runtime)}
                        {data.rating ? renderRating() : ' | No rating'}
                    </span>
                    <SeenIcon seen={data.seen} setSeen={setSeen} />
                    <FavouriteIcon favourite={data.favourite} setFavourite={setFavourite} />
                </div>
            </div>
        </div>
    );
};
