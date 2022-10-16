import { FC, memo, ReactElement, ReactNode, useEffect, useState } from 'react';
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
    setSeenEpisodes: (seasonId: number) => void;
}

export const MediaModal: FC<MediaModalProps> = memo((props) => {
    const [showSeasons, setShowSeasons] = useState<boolean>(false);
    const [posterSrc, setPosterSrc] = useState<string>(
        props.data.poster ? `https://storage.googleapis.com/tomlin-cdn/images/media${props.data.poster}` : '/images/media/poster.png'
    );

    useEffect(() => {
        document.body.classList.add('no-scroll');

        return (): void => document.body.classList.remove('no-scroll');
    }, []);

    const toggleSeasons = (): void => {
        setShowSeasons(!showSeasons);
    };

    const calculateSeenEpisodes = (seasons: MediaSeasonEntry[]): number =>
        seasons.reduce(
            (acc: number, cur: MediaSeasonEntry): number =>
                acc + cur.episodes.reduce((acc: number, cur: MediaEpisodeEntry): number => acc + (cur.seen ? 1 : 0), 0),
            0
        );

    const renderRow = (key: string, value?: string | ReactNode, className?: string): ReactNode => (
        <>
            <span className="text-neutral dark:text-neutral-dark">{key}</span>
            <span className={className}>{value}</span>
        </>
    );

    const renderOptional = (key: string, value?: string, className?: string): ReactNode =>
        value ? renderRow(key, value, className) : null;

    const renderRating = (rating?: number, votes?: number): ReactNode =>
        renderRow(
            'Rating',
            rating ? (
                <>
                    {rating} <span className="text-12 pl-4">({votes} votes)</span>
                </>
            ) : (
                'No rating'
            )
        );

    const renderPoster = (poster: string, title: string): ReactNode =>
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
            )
        );

    const renderLinks = (id: number, imdb: string | null): ReactNode =>
        renderRow(
            'Links',
            <div className="flex item-center gap-16 h-24">
                <a href={`https://www.themoviedb.org/${props.type}/${id}`} target="_blank" rel="noreferrer external">
                    <Image src="/images/icon/tmdb.svg" alt="TMDb" width={24} height={24} />
                </a>
                {imdb ? (
                    <a className="mlm pointer" href={`https://www.imdb.com/title/${imdb}`} target="_blank" rel="noreferrer external">
                        <Image src="/images/icon/imdb.svg" alt="IMDb" width={24} height={24} />
                    </a>
                ) : null}
                <Link href={`/media/search/${props.type}/similar/1/${id}`}>
                    <a>
                        <Icon
                            path={mdiApproximatelyEqualBox}
                            size={1}
                            title="Find similar"
                            className="text-secondary dark:text-secondary-dark"
                        />
                    </a>
                </Link>
                <Link href={`/media/search/${props.type}/recommended/1/${id}`}>
                    <a>
                        <Icon
                            path={mdiThumbUpOutline}
                            size={1}
                            title="Recommendations"
                            className="text-secondary dark:text-secondary-dark"
                        />
                    </a>
                </Link>
            </div>
        );

    const renderSeasons = (): ReactNode =>
        props.data.seasons ? (
            <div className="space-y-8">
                {props.data.seasons
                    .filter((s: MediaSeasonEntry): boolean => s.season > 0)
                    .map(
                        (season: MediaSeasonEntry): ReactNode => (
                            <MediaSeason
                                key={`season${season.id}`}
                                data={season}
                                setSeenEpisode={props.setSeenEpisode}
                                setSeenEpisodes={props.setSeenEpisodes}
                            />
                        )
                    )}
            </div>
        ) : null;

    const renderContent = (): ReactElement => (
        <div className="grid grid-cols-auto-1fr gap-x-12 gap-y-6 child:odd:text-neutral">
            {renderRow('Original', props.data.original_title ?? props.data.title)}
            {renderRow('Language', props.data.language)}
            {renderRow('Genre(s)', props.data.genres)}
            {renderRow('Release', props.data.release_date ? formatDate(props.data.release_date) : 'Unknown')}
            {renderRow('Language', props.data.language)}
            {renderRating(props.data.rating, props.data.votes)}
            {renderRow('Runtime', formatDuration(props.data.runtime))}
            {renderLinks(props.data.id, props.data.imdb_id)}
            {props.type === 'movie' ? (
                <>
                    {renderRow('Budget', props.data.budget ? `$ ${formatThousands(props.data.budget)}` : ' - ')}
                    {renderRow('Revenue', props.data.revenue ? `$ ${formatThousands(props.data.revenue)}` : ' - ')}
                    {renderOptional('Tagline', props.data.tagline)}
                </>
            ) : (
                <>
                    {renderRow(
                        'Episodes',
                        `${props.data.number_of_episodes} (Seen: ${props.data.seasons && calculateSeenEpisodes(props.data.seasons)}`
                    )}
                    {renderOptional('Type', props.data.series_type)}
                    {renderRow(
                        'Status',
                        <>
                            {props.data.status}
                            {props.data.end_year ? <span className="text-14 pl-4">({props.data.end_year})</span> : null}
                        </>
                    )}
                    {renderOptional('Network(s)', props.data.networks)}
                    {renderOptional('Created by', props.data.created_by)}
                    {renderOptional('Production', props.data.production_companies)}
                </>
            )}
            {renderOptional('Overview', props.data.overview)}
            {renderPoster(props.data.poster, props.data.title)}
        </div>
    );

    return (
        <Modal
            title={`${props.data.title} (${formatYears(props.type, props.data.release_year, props.data.end_year)})`}
            close={props.close}
            left={
                props.type === 'tv' ? (
                    <Button
                        text={
                            showSeasons
                                ? 'Overview'
                                : `${props.data.number_of_seasons} ${props.data.number_of_seasons !== 1 ? 'seasons' : 'season'}`
                        }
                        onClick={toggleSeasons}
                    />
                ) : null
            }
            right={
                <>
                    <Button text="Delete" icon={mdiDeleteOutline} onClick={props.remove} />
                    <Button text="Update" icon={mdiRefresh} onClick={props.update} />
                    <SeenIcon seen={props.data.seen} setSeen={props.setSeen} />
                    <FavouriteIcon favourite={props.data.favourite} setFavourite={props.setFavourite} />
                </>
            }>
            {showSeasons ? renderSeasons() : renderContent()}
        </Modal>
    );
});

MediaModal.displayName = 'MediaModal';
