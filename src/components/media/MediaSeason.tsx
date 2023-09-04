import { useState } from 'react';

import { formatDate, formatGradientHSL } from '@/util/formatting';

import { MediaEpisodeEntry, MediaSeasonEntry } from '@/interfaces';
import { Button } from '@/components/page/Button';
import { MediaEpisode } from './MediaEpisode';

interface MediaSeasonProps {
    data: MediaSeasonEntry;
    setSeenEpisode: (episodeId: number, set: boolean) => void;
    setSeenEpisodes: (seasonId: number) => void;
}

export const MediaSeason = ({ data, setSeenEpisode, setSeenEpisodes }: MediaSeasonProps) => {
    const [showEpisodes, setShowEpisodes] = useState<boolean>(false);

    const toggleEpisodes = (): void => {
        setShowEpisodes(!showEpisodes);
    };

    const episodesSeen = data.episodes.filter((ep: MediaEpisodeEntry): boolean => ep.seen).length;
    const episodesTotal = data.episodes.length;

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
                {episodesSeen === 0 ? <Button text="Mark all" onClick={() => setSeenEpisodes(data.id)} /> : <span />}
                <Button
                    text={`${episodesSeen}/${episodesTotal}`}
                    style={{ color: formatGradientHSL(episodesSeen, episodesTotal) }}
                    onClick={toggleEpisodes}
                />
            </div>
            {showEpisodes ? (
                <div className="grid grid-cols-media-content gap-x-8 gap-y-4 items-center px-12">
                    {data.episodes.map((episode) => (
                        <MediaEpisode episode={episode} setSeenEpisode={setSeenEpisode} key={`episode${episode.id}`} />
                    ))}
                </div>
            ) : null}
        </>
    );
};
