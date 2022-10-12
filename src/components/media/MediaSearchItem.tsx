import { FC, memo, useState } from 'react';
import Image from 'next/image';
import ISO6391 from 'iso-639-1';

import { button } from '@/styles';
import { formatDate } from '@/util/formatting';

import { MediaSearchItemEntry } from '@/interfaces';
import { Button } from '@/components/page/Button';

interface MediaSearchItemProps {
    data: MediaSearchItemEntry;
    stored: boolean;
    add: () => void;
    remove: () => void;
    imdb: () => void;
}

export const MediaSearchItem: FC<MediaSearchItemProps> = memo((props) => {
    const [src, setSrc] = useState<string>(
        props.data.poster_path ? `https://image.tmdb.org/t/p/w200${props.data.poster_path}` : '/images/media/poster_small.png'
    );

    const title = props.data.title ?? props.data.name;
    const originalTitle = props.data.original_title ?? props.data.original_name;
    const release = props.data.release_date ?? props.data.first_air_date;
    const language = ISO6391.getName(props.data.original_language);

    const validLanguage = (code: string): boolean => code === 'en' || code === 'no' || code === 'nb';

    return (
        <div className="grid grid-cols-auto-1fr gap-16">
            <div className="w-64 sm:w-96">
                <Image
                    src={src}
                    alt={props.data.poster_path ? `Poster: ${title}` : 'No poster'}
                    width={100}
                    height={150}
                    onError={(): void => setSrc('/images/media/poster_small.png')}
                />
            </div>
            <div>
                <div className="grid grid-cols-media-title gap-16">
                    <span
                        className="text-left text-secondary dark:text-secondary-dark font-bold"
                        data-tooltip={title !== originalTitle ? originalTitle : undefined}>
                        {title}
                    </span>
                    <span className="text-right font-bold whitespace-nowrap">{formatDate(release, 'yyyy')}</span>
                </div>
                <div className="grid grid-cols-media-content items-center gap-8 text-14 mt-8">
                    <button onClick={props.imdb} className="h-24">
                        <Image src="/images/icon/imdb.svg" alt="IMDb" width={24} height={24} />
                    </button>
                    <span className="col-span-2">
                        <span className={validLanguage(props.data.original_language) ? 'text-good' : 'text-warn'}>
                            {language || 'Unknown'}
                        </span>{' '}
                        |{' '}
                        {props.data.vote_average ? (
                            <span className="font-bold" data-tooltip={`${props.data.vote_count ?? 0} votes`}>
                                {props.data.vote_average}
                            </span>
                        ) : (
                            <span>No rating</span>
                        )}{' '}
                        | {release ? formatDate(release) : 'Unknown'}
                    </span>
                    <Button text={props.stored ? 'Remove' : 'Add'} className={button} onClick={props.stored ? props.remove : props.add} />
                </div>
                <div className="text-14 mt-8">{props.data.overview === '' ? 'No description.' : props.data.overview}</div>
            </div>
        </div>
    );
});

MediaSearchItem.displayName = 'MediaSearchItem';
