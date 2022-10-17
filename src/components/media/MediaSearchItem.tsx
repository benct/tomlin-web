import { FC, useState } from 'react';
import Image from 'next/image';
import ISO6391 from 'iso-639-1';

import { formatDate } from '@/util/formatting';
import { useMediaSearchActions } from '@/data/media';

import { MediaSearchItemEntry, MediaType } from '@/interfaces';
import { Button } from '@/components/page/Button';

interface MediaSearchItemProps {
    data: MediaSearchItemEntry;
    type: MediaType;
}

export const MediaSearchItem: FC<MediaSearchItemProps> = ({ data, type }) => {
    const { existing, add, remove, imdb } = useMediaSearchActions();
    const [src, setSrc] = useState<string>(
        data.poster_path ? `https://image.tmdb.org/t/p/w200${data.poster_path}` : '/images/media/poster_small.png'
    );

    const current = existing[data.media_type ?? type] ?? [];
    const stored = current.includes(data.id);

    const title = data.title ?? data.name;
    const originalTitle = data.original_title ?? data.original_name;
    const release = data.release_date ?? data.first_air_date;
    const language = ISO6391.getName(data.original_language);
    const validLanguage = data.original_language === 'en' || data.original_language === 'no' || data.original_language === 'nb';

    const handleAddRemove = () => {
        stored ? remove(type, data.id) : add(type, data.id);
    };

    return (
        <div className="grid grid-cols-auto-1fr gap-16">
            <div className="w-64 sm:w-96">
                <Image
                    src={src}
                    alt={data.poster_path ? `Poster: ${title}` : 'No poster'}
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
                    <button onClick={() => imdb(type, data.id)} className="h-24">
                        <Image src="/images/icon/imdb.svg" alt="IMDb" width={24} height={24} />
                    </button>
                    <span className="col-span-2">
                        <span className={validLanguage ? 'text-good' : 'text-warn'}>{language || 'Unknown'}</span> |{' '}
                        {data.vote_average ? (
                            <span className="font-bold" data-tooltip={`${data.vote_count ?? 0} votes`}>
                                {data.vote_average}
                            </span>
                        ) : (
                            <span>No rating</span>
                        )}{' '}
                        | {release ? formatDate(release) : 'Unknown'}
                    </span>
                    <Button text={stored ? 'Remove' : 'Add'} onClick={handleAddRemove} />
                </div>
                <div className="text-14 mt-8">{data.overview === '' ? 'No description.' : data.overview}</div>
            </div>
        </div>
    );
};
