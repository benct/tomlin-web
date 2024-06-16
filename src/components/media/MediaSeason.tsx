import { useState } from 'react';

import { formatDate, formatGradientHSL } from '@/util/formatting';

import { MediaEpisodeEntry, MediaSeasonEntry } from '@/interfaces';
import { MediaEpisode } from './MediaEpisode';
import { SeenIcon } from '@/components/media/MediaIcons';

interface MediaSeasonProps {
    data: MediaSeasonEntry;
    setSeenEpisode: (episodeId: number, set: boolean) => void;
    setSeenEpisodes: (seasonId: number, set: boolean) => void;
    removeEpisode: (episodeId: number) => void;
}

export const MediaSeason = ({ data, setSeenEpisode, setSeenEpisodes, removeEpisode }: MediaSeasonProps) => {
    const [showEpisodes, setShowEpisodes] = useState<boolean>(false);

    const toggleEpisodes = (): void => {
        setShowEpisodes(!showEpisodes);
    };

    const episodesSeen = data.episodes.filter((ep: MediaEpisodeEntry): boolean => ep.seen).length;
    const episodesTotal = data.episodes.length;
    const seasonSeen = episodesSeen === episodesTotal;

    return (
        <>
            <div className="grid grid-cols-media-content gap-8 items-center">
                <span className="text-14 text-neutral dark:text-neutral-dark">{data.season}</span>
                <div>
                    <button onClick={toggleEpisodes} className="text-secondary dark:text-secondary-dark">
                        {data.title?.trim() || 'No Title'}
                    </button>
                    <span className="text-14 pl-8">{data.release_date ? formatDate(data.release_date, '(MMM do, YYY)') : 'Unknown'}</span>
                </div>
                <span className="text-14 font-bold" style={{ color: formatGradientHSL(episodesSeen, episodesTotal) }}>
                    {episodesSeen}/{episodesTotal}
                </span>
                <SeenIcon seen={seasonSeen} setSeen={() => setSeenEpisodes(data.id, !seasonSeen)} />
            </div>
            {showEpisodes ? (
                <div className="grid grid-cols-media-content gap-x-8 gap-y-8 items-center pl-12">
                    {data.episodes.map((episode) => (
                        <MediaEpisode
                            episode={episode}
                            setSeenEpisode={setSeenEpisode}
                            removeEpisode={removeEpisode}
                            key={`episode${episode.id}`}
                        />
                    ))}
                </div>
            ) : null}
        </>
    );
};
