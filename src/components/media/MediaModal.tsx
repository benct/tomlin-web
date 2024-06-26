import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@mdi/react';
import { mdiApproximatelyEqualBox, mdiDeleteOutline, mdiRefresh, mdiThumbUpOutline } from '@mdi/js';

import { formatDate, formatDuration, formatThousands, formatYears } from '@/util/formatting';

import { MediaEpisodeEntry, MediaItemEntry, MediaSeasonEntry, MediaType } from '@/interfaces';
import { Modal } from '@/components/page/Modal';
import { Button } from '@/components/page/Button';
import { FavouriteIcon, SeenIcon } from './MediaIcons';
import { MediaSeason } from './MediaSeason';

interface MediaModalProps {
    type: MediaType;
    data: MediaItemEntry;
    close: () => void;
    update: () => void;
    remove: () => void;
    setSeen: () => void;
    setFavourite: () => void;
    setSeenEpisode: (episodeId: number, set: boolean) => void;
    setSeenEpisodes: (seasonId: number, set: boolean) => void;
    removeEpisode: (episodeId: number) => void;
}

export const MediaModal = ({
    data,
    type,
    close,
    update,
    remove,
    setSeen,
    setFavourite,
    setSeenEpisode,
    setSeenEpisodes,
    removeEpisode,
}: MediaModalProps) => {
    const [showSeasons, setShowSeasons] = useState<boolean>(false);
    const [posterSrc, setPosterSrc] = useState<string>(
        data.poster ? `https://storage.googleapis.com/tomlin-cdn/images/media${data.poster}` : '/images/media/poster.png',
    );

    useEffect(() => {
        document.body.classList.add('no-scroll');

        return (): void => document.body.classList.remove('no-scroll');
    }, []);

    const toggleSeasons = (): void => {
        setShowSeasons(!showSeasons);
    };

    const calculateSeenEpisodes = (seasons: MediaSeasonEntry[]): number =>
        seasons
            .filter((season): boolean => season.season > 0)
            .flatMap((season): MediaEpisodeEntry[] => season.episodes)
            .filter((episode): boolean => episode.seen).length;

    const calculateTotalEpisodes = (seasons: MediaSeasonEntry[]): number =>
        seasons.filter((season): boolean => season.season > 0).flatMap((season): MediaEpisodeEntry[] => season.episodes).length;

    const renderRow = (key: string, value?: string | ReactNode, className?: string) => (
        <>
            <span className="text-neutral dark:text-neutral-dark">{key}</span>
            <span className={className}>{value}</span>
        </>
    );

    const renderOptional = (key: string, value?: string, className?: string) => (value ? renderRow(key, value, className) : null);

    const renderRating = (rating?: number, votes?: number) =>
        renderRow(
            'Rating',
            rating ? (
                <>
                    {rating} <span className="text-12 pl-4">({votes} votes)</span>
                </>
            ) : (
                'No rating'
            ),
        );

    const renderPoster = (poster: string, title: string) =>
        renderRow(
            'Poster',
            poster ? (
                <Image
                    src={posterSrc}
                    alt={`Poster: ${title}`}
                    width={200}
                    height={300}
                    placeholder="blur"
                    blurDataURL="/images/media/poster.png"
                    onError={(): void => setPosterSrc('/images/media/poster.png')}
                />
            ) : (
                'No poster'
            ),
        );

    const renderLinks = (id: number, imdb: string | null) =>
        renderRow(
            'Links',
            <div className="flex item-center gap-16 h-24">
                <a href={`https://www.themoviedb.org/${type}/${id}`} target="_blank" rel="noreferrer external">
                    <Image src="/images/icon/tmdb.svg" alt="TMDb" width={24} height={24} />
                </a>
                {imdb ? (
                    <a className="mlm pointer" href={`https://www.imdb.com/title/${imdb}`} target="_blank" rel="noreferrer external">
                        <Image src="/images/icon/imdb.svg" alt="IMDb" width={24} height={24} />
                    </a>
                ) : null}
                <Link href={`/media/search/${type}/similar/1/${id}`}>
                    <Icon
                        path={mdiApproximatelyEqualBox}
                        size={1}
                        title="Find similar"
                        className="text-secondary dark:text-secondary-dark"
                    />
                </Link>
                <Link href={`/media/search/${type}/recommended/1/${id}`}>
                    <Icon path={mdiThumbUpOutline} size={1} title="Recommendations" className="text-secondary dark:text-secondary-dark" />
                </Link>
            </div>,
        );

    const renderSeasons = () =>
        data.seasons ? (
            <div className="space-y-8">
                {data.seasons.map((season: MediaSeasonEntry) => (
                    <MediaSeason
                        key={`season${season.id}`}
                        data={season}
                        setSeenEpisode={setSeenEpisode}
                        setSeenEpisodes={setSeenEpisodes}
                        removeEpisode={removeEpisode}
                    />
                ))}
            </div>
        ) : null;

    const renderContent = () => (
        <div className="grid grid-cols-auto-1fr gap-x-12 gap-y-6 child:odd:text-neutral">
            {renderRow('Original', data.original_title ?? data.title)}
            {renderRow('Language', data.language)}
            {renderRow('Genre(s)', data.genres)}
            {renderRow('Release', data.release_date ? formatDate(data.release_date) : 'Unknown')}
            {renderRow('Language', data.language)}
            {renderRating(data.rating, data.votes)}
            {renderRow('Runtime', formatDuration(data.runtime))}
            {renderLinks(data.id, data.imdb_id)}
            {type === 'movie' ? (
                <>
                    {renderRow('Budget', data.budget ? `$ ${formatThousands(data.budget)}` : ' - ')}
                    {renderRow('Revenue', data.revenue ? `$ ${formatThousands(data.revenue)}` : ' - ')}
                    {renderOptional('Tagline', data.tagline)}
                </>
            ) : (
                <>
                    {renderRow(
                        'Episodes',
                        data.seasons
                            ? `${calculateTotalEpisodes(data.seasons)} (Seen: ${calculateSeenEpisodes(data.seasons)})`
                            : data.number_of_episodes,
                    )}
                    {renderOptional('Type', data.series_type)}
                    {renderRow(
                        'Status',
                        <>
                            {data.status}
                            {data.end_year ? <span className="text-14 pl-4">({data.end_year})</span> : null}
                        </>,
                    )}
                    {renderOptional('Network(s)', data.networks)}
                    {renderOptional('Created by', data.created_by)}
                    {renderOptional('Production', data.production_companies)}
                </>
            )}
            {renderOptional('Overview', data.overview)}
            {renderPoster(data.poster, data.title)}
        </div>
    );

    return (
        <Modal
            title={`${data.title} (${formatYears(type, data.release_year, data.end_year)})`}
            close={close}
            left={
                type === 'tv' ? (
                    <Button
                        text={showSeasons ? 'Overview' : `${data.number_of_seasons} ${data.number_of_seasons !== 1 ? 'seasons' : 'season'}`}
                        onClick={toggleSeasons}
                    />
                ) : null
            }
            right={
                <>
                    <Button text="Delete" icon={mdiDeleteOutline} onClick={remove} />
                    <Button text="Update" icon={mdiRefresh} onClick={update} />
                    <SeenIcon seen={data.seen} setSeen={setSeen} />
                    <FavouriteIcon favourite={data.favourite} setFavourite={setFavourite} />
                </>
            }>
            {showSeasons ? renderSeasons() : renderContent()}
        </Modal>
    );
};
